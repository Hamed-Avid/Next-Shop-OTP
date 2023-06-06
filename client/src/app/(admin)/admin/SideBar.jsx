"use client";

import { logoutUser } from "@/services/authServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBoxOpen } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { RiDashboard3Line, RiLineChartLine } from "react-icons/ri";
import { TbBadge, TbLogout } from "react-icons/tb";

function SideBar() {
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logoutUser();
    document.location.href = "/";
  };

  return (
    <ul className="flex flex-col gap-y-4 p-2 pb-3">
      <li className={pathname === "/admin" ? "nav__list__active" : "nav__list"}>
        <Link href="/admin" className="cursor-pointer flex gap-x-2">
          <RiDashboard3Line className="icon" />
          داشبورد
        </Link>
      </li>
      <li
        className={
          pathname === "/admin/users" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/admin/users" className="cursor-pointer flex gap-x-2">
          <FiUsers className="icon" />
          کاربران
        </Link>
      </li>
      <li
        className={
          pathname === "/admin/products" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/admin/products" className="cursor-pointer flex gap-x-2">
          <FaBoxOpen className="icon" />
          محصولات
        </Link>
      </li>
      <li
        className={
          pathname === "/admin/categories" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/admin/categories" className="cursor-pointer flex gap-x-2">
          <TbBadge className="icon" />
          دسته بندی
        </Link>
      </li>
      <li
        className={
          pathname === "/admin/coupons" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/admin/coupons" className="cursor-pointer flex gap-x-2">
          <IoTicketOutline className="icon" />
          کد تخفیف
        </Link>
      </li>
      <li
        className={
          pathname === "/admin/payments" ? "nav__list__active" : "nav__list"
        }
      >
        <Link href="/admin/payments" className="cursor-pointer flex gap-x-2">
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
