"use client";

import { logoutUser } from "@/services/authServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegChartBar, FaUserEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

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
          <AiFillDashboard className="icon" />
          داشبورد
        </Link>
      </li>
      <li
        className={
          pathname === "/profile/me" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/profile/me" className="cursor-pointer flex gap-x-2">
          <FaUserEdit className="icon" />
          اطلاعات کاربری
        </Link>
      </li>
      <li
        className={
          pathname === "/profile/payments" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/profile/payments" className="cursor-pointer flex gap-x-2">
          <FaRegChartBar className="icon" />
          سفارشات
        </Link>
      </li>
      <li className="hover:bg-gray-100 hover:text-error text-secondary-800 p-2 rounded-xl">
        <button onClick={logoutHandler} className="flex gap-x-2">
          <IoLogOut className="icon" />
          خروج
        </button>
      </li>
    </ul>
  );
}

export default SideBar;
