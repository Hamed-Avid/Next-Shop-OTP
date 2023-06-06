"use client";

import { logoutUser } from "@/services/authServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboard3Line,
  RiLineChartLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

function SideBar() {
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logoutUser();
    // localStorage.removeItem("cartItems");
    document.location.href = "/";
  };
  return (
    <ul className="flex flex-col gap-y-4 p-2 pb-3">
      <li
        className={pathname === "/profile" ? "nav__list__active" : "nav__list"}
      >
        <Link href="/profile" className="cursor-pointer flex gap-x-2">
          <RiDashboard3Line className="icon" />
          داشبورد
        </Link>
      </li>
      <li
        className={
          pathname === "/profile/me" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/profile/me" className="cursor-pointer flex gap-x-2">
          <RiUserSettingsLine className="icon" />
          اطلاعات کاربری
        </Link>
      </li>
      <li
        className={
          pathname === "/profile/payments" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/profile/payments" className="cursor-pointer flex gap-x-2">
          <RiLineChartLine className="icon" />
          سفارشات
        </Link>
      </li>
      <li className="hover:bg-gray-100 hover:text-error p-2 rounded-xl">
        <button onClick={logoutHandler} className="flex gap-x-2">
          <TbLogout className="icon" />
          خروج
        </button>
      </li>
    </ul>
  );
}

export default SideBar;
