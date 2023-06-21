import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ItemNav.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function ItemNav({ to, icon, activeIcon, title, className, active, watch }) {
  return (
    <NavLink
      to={to}
      className={
        !watch
          ? "flex flex-col items-center justify-center text-center py-[17px] hover:bg-[#272727] hover:rounded-[12px]"
          : "flex flex-col items-center md:hidden"
      }
    >
      <div className="mt-[1px]">
        {!active ? (
          <span className="">{icon}</span>
        ) : (
          <span className="">{activeIcon}</span>
        )}
      </div>
      <div className="text-[10px] text-[#f1f1f1] font-normal translate-y-[5.5px]">
        {title}
      </div>
    </NavLink>
  );
}
export default ItemNav;
