import { useEffect, useState } from "react";
import {
  HomeIcon,
  HomeIconActive,
  LibraryIcon,
  LibraryIconActive,
  RegisterChanelIcon,
  RegisterChanelIconActive,
  ShortIcon,
  ShortIconActive,
} from "../../assets/Icon";
import ItemNav from "../Sidebar/ItemNav";

const a = "dsadsadsa";
function Footer() {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("selectSidebar")) !== undefined
      ? JSON.parse(localStorage.getItem("selectSidebar"))
      : 0
  );

  const footer = [
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
    <div className="block md:hidden">
      <footer className="fixed justify-around pt-[6px] pb-[10px]  bottom-0 right-0 left-0 flex bg-black">
        {footer.map((item, index) => (
          <div className="" key={index} onClick={() => handleActive(index)}>
            <ItemNav
              watch={true}
              title={item.title ? item.title : ""}
              icon={item.icon ? item.icon : ""}
              to={item.to ?? item.to}
              activeIcon={item.activeIcon ? item.activeIcon : ""}
              active={index === count}
            ></ItemNav>
          </div>
        ))}
      </footer>
    </div>
  );
}

export default Footer;
