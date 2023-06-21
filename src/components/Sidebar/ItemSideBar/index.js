import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ItemSideBar.module.scss";

const cx = classNames.bind(styles);

function ItemSideBar({ to, icon, activeIcon, title, onclick }) {
  return (
    <NavLink
      to={to}
      onClick={onclick}
      className={(nav) => cx("menu-item", { active: nav.isActive })}
    >
      <div className="flex">
        <div className="">
          <span className={cx("icon")}>{icon}</span>
          <span className={cx("active-icon")}>{activeIcon}</span>
        </div>
        <div className={cx("title")}>{title}</div>
      </div>
    </NavLink>
  );
}

export default ItemSideBar;
