import {
  HomeIcon,
  HomeIconActive,
  LibraryIcon,
  LibraryIconActive,
  LikeSideBarActive,
  LikeSideBarIcon,
  ListVideosActive,
  ListVideosIcon,
  RegisterChanelIcon,
  RegisterChanelIconActive,
  SeeLaterActive,
  SeeLaterIcon,
  ShortIcon,
  ShortIconActive,
  VideoViewedIcon,
  VideoViewedIconActive,
} from "../../assets/Icon";
import ItemNav from "./ItemNav";
import Sidenav from "./Sidenav";
import MenuHeader from "../MenuHeader";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/actions/toggle";
import ItemSideBar from "./ItemSideBar";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Sidebar() {
  const [count, setCount] = useState(
    !!JSON.parse(localStorage.getItem("selectSidebar"))
      ? JSON.parse(localStorage.getItem("selectSidebar"))
      : 0
  );
  const toggleMenu = useSelector((state) => state.toggleSidebarReducer);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggle(toggleMenu));
  };

  const sidenavData = [
    {
      title: "Trang chủ",
      icon: <HomeIcon className="h-[24px] w-[24px]" />,
      to: "/",
      activeIcon: <HomeIconActive className="h-[24px] w-[24px]" />,
    },

    {
      title: "Shorts",
      icon: <ShortIcon className="h-[24px] w-[24px]" />,
      to: "/Shorts",
      activeIcon: <ShortIconActive className="h-[24px] w-[24px]" />,
    },
    {
      title: "Kênh đăng ký",
      icon: <RegisterChanelIcon className="h-[24px] w-[24px]" />,
      to: "/RegisterChanel",
      activeIcon: <RegisterChanelIconActive className="h-[24px] w-[24px]" />,
    },
    {
      title: "Thư viện",
      icon: <LibraryIcon className="h-[24px] w-[24px]" />,
      to: "/Library",
      activeIcon: <LibraryIconActive className="h-[24px] w-[24px]" />,
    },
  ];
  const handleActive = (index) => {
    localStorage.setItem("selectSidebar", JSON.stringify(index));
    const itemActive = localStorage.getItem("selectSidebar");
    if (itemActive) {
      setCount(JSON.parse(localStorage.getItem("selectSidebar")));
    }
  };
  const url = window.location.href;

  useEffect(() => {
    const itemActive = JSON.parse(localStorage.getItem("selectSidebar"));
    if (itemActive !== null) {
      setCount(itemActive);
    } else {
      setCount(0);
    }
  }, [url]);

  return (
    <>
      <div className="sidebar fixed bg-black bottom-0 top-[56px] hidden md:block">
        <aside className="w-[64px] ml-1 text-white mt-[2px]">
          <Sidenav>
            {sidenavData.map((item, index) => (
              <div className="" key={index} onClick={() => handleActive(index)}>
                <ItemNav
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                  activeIcon={item.activeIcon}
                  active={index === count}
                ></ItemNav>
              </div>
            ))}
          </Sidenav>
        </aside>
      </div>
      <div
        className={`${
          toggleMenu && "fixed flex top-0 bottom-0 left-0 right-0 z-[2000]"
        }`}
      >
        <div
          className={`fixed top-0 bottom-0 bg-black w-[240px] ease-in duration-300 z-20 ${
            toggleMenu ? "translate-x-0" : "-translate-x-[240px]"
          }`}
        >
          <MenuHeader className="p-2 ml-2" />
          <div className={cx("sidebarbig", "p-3 overflow-auto h-full")}>
            <div className="page">
              <Sidenav>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Trang chủ"
                  icon={<HomeIcon className="h-[24px] w-[24px] mr-[24px]" />}
                  to={"/"}
                  activeIcon={
                    <HomeIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Shorts"
                  icon={<ShortIcon className="h-[24px] w-[24px] mr-[24px]" />}
                  to={"/Shorts"}
                  activeIcon={
                    <ShortIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Kênh đăng ký"
                  icon={
                    <RegisterChanelIcon className="h-[24px] w-[24px] mr-[24px]" />
                  }
                  to={"/RegisterChanel"}
                  activeIcon={
                    <RegisterChanelIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <div className="saved border-t-[1px] border-[#ffffff33] mt-3 py-3">
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Thư viện"
                    icon={
                      <LibraryIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <LibraryIconActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Video đã xem"
                    icon={
                      <VideoViewedIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <VideoViewedIconActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Xem sau"
                    icon={
                      <SeeLaterIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <SeeLaterActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Danh sách"
                    icon={
                      <ListVideosIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <ListVideosActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Video đã thích"
                    icon={
                      <LikeSideBarIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <LikeSideBarActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                </div>
              </Sidenav>
            </div>
            <div className="page">
              <Sidenav>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Trang chủ"
                  icon={<HomeIcon className="h-[24px] w-[24px] mr-[24px]" />}
                  to={"/"}
                  activeIcon={
                    <HomeIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Shorts"
                  icon={<ShortIcon className="h-[24px] w-[24px] mr-[24px]" />}
                  to={"/Shorts"}
                  activeIcon={
                    <ShortIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <ItemSideBar
                  onclick={() => handleToggleMenu()}
                  title="Kênh đăng ký"
                  icon={
                    <RegisterChanelIcon className="h-[24px] w-[24px] mr-[24px]" />
                  }
                  to={"/RegisterChanel"}
                  activeIcon={
                    <RegisterChanelIconActive className="h-[24px] w-[24px] mr-[24px]" />
                  }
                ></ItemSideBar>
                <div className="saved border-t-[1px] border-[#ffffff33] mt-3 py-3">
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Thư viện"
                    icon={
                      <LibraryIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <LibraryIconActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Video đã xem"
                    icon={
                      <VideoViewedIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <VideoViewedIconActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Xem sau"
                    icon={
                      <SeeLaterIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <SeeLaterActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Danh sách"
                    icon={
                      <ListVideosIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <ListVideosActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                  <ItemSideBar
                    onclick={() => handleToggleMenu()}
                    title="Video đã thích"
                    icon={
                      <LikeSideBarIcon className="h-[24px] w-[24px] mr-[24px]" />
                    }
                    to={"/RegisterChanel"}
                    activeIcon={
                      <LikeSideBarActive className="h-[24px] w-[24px] mr-[24px]" />
                    }
                  ></ItemSideBar>
                </div>
              </Sidenav>
            </div>
          </div>
        </div>
        {toggleMenu && (
          <div
            className="overlay bg-black/50 flex-1"
            onClick={() => handleToggleMenu()}
          ></div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
