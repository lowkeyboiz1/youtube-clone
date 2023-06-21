import { useEffect, useState } from "react";
import {
  BackIcon,
  Chanle,
  NotificateIcon,
  SearchIcon,
  TreeDotIcon,
  UploadIcon,
  VoiceIcon,
} from "../../assets/Icon";
import Button from "../Button";
import ItemIconHeader from "../ItemIconHeader";
import Search from "../Search";
import Menu from "../Menu";
import "tippy.js/dist/tippy.css"; // optional
import Tippy from "@tippyjs/react/headless";
import MenuHeader from "../MenuHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function Header() {
  const [showStartandEnd, setShowStartandEnd] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [openUserControl, setOpenUserControl] = useState(false);

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [loggedInUser] = useAuthState(auth);

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser.email),
          {
            email: loggedInUser.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser.photoURL,
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log("save User to DB fail", error);
      }
    };

    if (loggedInUser) {
      setUserInDb();
    }
  }, [loggedInUser]);

  const handleToggleInput = () => {
    setShowStartandEnd(!showStartandEnd);
    setShowInput(!showInput);
  };

  const handleLogin = () => {
    signInWithGoogle();
  };
  const handleLogout = async () => {
    try {
      handleClose();
      await signOut(auth);
    } catch (error) {
      console.log("logout error", error);
    }
  };

  const handleOpen = () => {
    setOpenUserControl(true);
  };
  const handleClose = () => {
    setOpenUserControl(false);
  };
  return (
    <header className="flex justify-between h-[56px] md:pl-4 md:pr-6 md:px-4 bg-black items-center fixed w-full z-10">
      {showStartandEnd && <MenuHeader />}
      {showInput && (
        <div onClick={handleToggleInput}>
          <ItemIconHeader className="bg-black border-0">
            <BackIcon className="h-[24px] w-[24px] text-white" />
          </ItemIconHeader>
        </div>
      )}
      <div className="center flex items-center gap-2 ml-6 justify-end max-w-[580px] flex-1 lg:ml-[160px]">
        <Search
          blur={() => {
            setShowInput(false);
            setShowStartandEnd(true);
          }}
          className={`${showInput ? "!flex" : ""}`}
        />
        {showStartandEnd && (
          <div
            className="search-icon-menu md:hidden"
            onClick={handleToggleInput}
          >
            <ItemIconHeader className="bg-black border-0">
              <SearchIcon className="h-[24px] w-[24px] text-white" />
            </ItemIconHeader>
          </div>
        )}
        <Menu content="Tìm kiếm bằng giọng nói">
          <div className="h-[40px] w-[40px] bg-[#161616] rounded-none md:rounded-full">
            <ItemIconHeader className="rounded-none">
              <VoiceIcon className="h-[24px] w-[24px] text-white" />
            </ItemIconHeader>
          </div>
        </Menu>
      </div>
      <div className="center2"></div>
      {loggedInUser ? (
        <div
          className={`end gap-2 items-center flex ${
            showStartandEnd ? "flex z-[300]" : "hidden z-[300]"
          }`}
        >
          <Menu content="Tạo">
            <div className="upload hidden md:block">
              <ItemIconHeader className="bg-black border-0">
                <UploadIcon className="h-[24px] w-[24px] text-white" />
              </ItemIconHeader>
            </div>
          </Menu>
          <Menu content="Thông báo">
            <div className="notication">
              <ItemIconHeader className="bg-black border-0">
                <NotificateIcon className="h-[24px] w-[24px] text-white" />
              </ItemIconHeader>
            </div>
          </Menu>
          <Tippy
            interactive
            visible={openUserControl}
            onClickOutside={() => handleClose()}
            offset={[0, 16]}
            placement="left"
            render={(attrs) => (
              <div
                className="bg-[#282828] rounded-[10px] text-[#f1f1f1] min-w-[300px] mt-2"
                tabIndex="-1"
                {...attrs}
              >
                <header className="flex border-b-[1px] border-[#fff3] p-[16px] text-[16px]">
                  <div className="user">
                    <img
                      className="h-[40px] w-[40px] mr-[12px] rounded-full cursor-pointer"
                      src={loggedInUser.photoURL}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <div className="fullname">{loggedInUser.displayName}</div>
                    <div className="nickname">{loggedInUser.email}</div>
                    <div className="management-account text-[14px] mt-2 text-[#3ea6ff]">
                      <Link
                        to="https://myaccount.google.com/u/0/?utm_source=YouTubeWeb&tab=rk&utm_medium=act&tab=rk&hl=vi"
                        target="_blank"
                      >
                        Quản lý Tài khoản Google của bạn
                      </Link>
                    </div>
                  </div>
                </header>
                <div className="body py-[8px] text-[14px] overflow-y-auto h-[80vh]">
                  <div className="user-control pb-[8px] border-b-[1px] border-[#fff3]">
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Kênh của bạn</div>
                    </div>
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Youtube Studio</div>
                    </div>
                    <div className="item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">
                        Chuyển đổi tài khoản
                      </div>
                      <div className="absolute right-8 text-sm">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </div>
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Kênh của bạn</div>
                    </div>
                  </div>
                  <div className="user-control pb-[8px] border-b-[1px] border-[#fff3]">
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Kênh của bạn</div>
                    </div>
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Youtube Studio</div>
                    </div>
                    <div className="item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">
                        Chuyển đổi tài khoản
                      </div>
                      <div className="absolute right-8 text-sm">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </div>
                    <div
                      className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer"
                      onClick={handleLogout}
                    >
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Đăng xuất</div>
                    </div>
                  </div>
                  <div className="user-control pb-[8px] border-b-[1px] border-[#fff3]">
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Kênh của bạn</div>
                    </div>
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Youtube Studio</div>
                    </div>
                    <div className="item relative h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">
                        Chuyển đổi tài khoản
                      </div>
                      <div className="absolute right-8 text-sm">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </div>
                    <div className="item h-[40px] px-[16px] flex items-center hover:bg-[#ffffff1a] cursor-pointer">
                      <div className="icon">
                        <Chanle />
                      </div>
                      <div className="title ml-[16px]">Kênh của bạn</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <div className="user mr-2 md:mx-3">
              {loggedInUser ? (
                <img
                  onClick={handleOpen}
                  className={`h-[32px] w-[32px] rounded-full cursor-pointer
                  }`}
                  src={loggedInUser.photoURL}
                  alt=""
                />
              ) : (
                <div
                  className={`h-full w-full object-cover ${
                    !loggedInUser && "bg-gray-300 animate-pulse"
                  }`}
                  alt=""
                ></div>
              )}
            </div>
          </Tippy>
        </div>
      ) : (
        <div className="end flex justify-center items-center">
          <Menu content="Cài đặt">
            <div className="menu-header p-2 mr-[6px]">
              <ItemIconHeader className="bg-black border-0 p-2 mr-[6px]">
                <TreeDotIcon className="h-[24px] w-[24px] text-white cursor-pointer" />
              </ItemIconHeader>
            </div>
          </Menu>
          <div
            className="btn-login border-[1px] border-[#3f3f3f] rounded-full px-3 py-1 hover:bg-[#1a2737] cursor-pointer"
            onClick={handleLogin}
          >
            <Button className="flex items-center justify-center">
              <div className="icon-login">
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  fill="currentColor"
                  className="h-[24px] w-[24px] text-[#3ea6ff] mr-[6px]"
                >
                  <g>
                    <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z"></path>
                  </g>
                </svg>
              </div>
              <span className="text-[#3ea6ff] text-sm font-medium">
                Đăng nhập
              </span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
