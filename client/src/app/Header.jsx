"use client";

import { useGetUser } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBoxOpen, FaUserAlt } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineShoppingCart } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { TbLogin } from "react-icons/tb";
import { HiShoppingCart } from "react-icons/hi2";
import UserSideBar from "./(profile)/profile/sideBar";
import AdminSideBar from "./(admin)/admin/SideBar";
import { usePathname } from "next/navigation";

function Header() {
  const { data, error, isLoading } = useGetUser();
  const [isProfileToggle, setIsProfileToggle] = useState(false);
  const [isMenuToggle, setIsMenuToggle] = useState(false);
  const { user, cart } = data || {};
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logoutUser();
    document.location.href = "/";
  };

  return (
    <>
      <header
        className={`sticky top-0 transition-all duration-200 backdrop-blur-2xl
    ${isLoading ? "blur-md opacity-70" : "blur-0 opacity-100"}`}
      >
        <div className="w-full mx-auto">
          <nav className="flex items-center justify-between p-2 md:p-8 h-16">
            <div className="md:hidden flex items-center gap-x-5">
              <button onClick={() => setIsMenuToggle(!isMenuToggle)}>
                <HiOutlineMenuAlt3 className="w-10 h-10" />
              </button>
              <Link href="/">
                <Image
                  src="/images/avid-logo-small.png"
                  width={48}
                  height={43}
                  alt="avid logo"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-x-14">
              <Link href="/">
                <Image
                  src="/images/Avid-logo.png"
                  width={130}
                  height={50}
                  alt="avid logo"
                />
              </Link>
              <ul className="flex gap-x-8">
                <li
                  className={
                    pathname === "/"
                      ? "text-primary-900 font-bold text-lg border-b-2 border-primary-900"
                      : "text-secondary-800"
                  }
                >
                  <Link className="block py-2" href="/">
                    صفحه اصلی
                  </Link>
                </li>
                <li
                  className={
                    pathname === "/products"
                      ? "text-primary-900 font-bold text-lg border-b-2 border-primary-900"
                      : "text-secondary-800"
                  }
                >
                  <Link className="block py-2" href="/products">
                    محصولات
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-x-3 md:gap-x-5 ">
              <div className="border border-gray-200 p-2 rounded-lg">
                <Link
                  className="flex items-center justify-between gap-x-1"
                  href="/cart"
                >
                  <span className="flex items-center justify-center text-lg bg-rose-500 pt-1 icon rounded-full text-white">
                    {cart ? cart.payDetail.orderItems.length : 0}
                  </span>
                  {cart?.payDetail?.orderItems.length > 0 ? (
                    <HiShoppingCart className="icon text-secondary-800" />
                  ) : (
                    <HiOutlineShoppingCart className="icon text-secondary-800" />
                  )}
                </Link>
              </div>
              <div>
                {user ? (
                  <button
                    onClick={() => setIsProfileToggle(!isProfileToggle)}
                    className="flex items-center gap-x-0.5 border border-gray-200 text-secondary-800 py-2 px-1 rounded-lg"
                  >
                    <FaUserAlt className="w-5 h-5" />
                    <RiArrowDownSLine className="icon" />
                  </button>
                ) : (
                  <Link
                    className="flex items-center gap-x-0.5 btn btn--primary"
                    href="/auth"
                  >
                    ورود
                    <TbLogin className="icon" />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      {isProfileToggle && (
        <div className="transition-all duration-300 ease-in-out absolute left-4 top-14 bg-white rounded-xl w-52 h-auto border border-gray-100">
          <div className="flex p-2 gap-x-1 border-b-2">
            <span className="bg-gray-400 border border-gray-200 w-10 h-10 flex items-center text-xl justify-center rounded-full text-white">
              {user && user?.avatarUrl ? user?.avatarUrl : user?.name[0]}
            </span>
            <div className="flex flex-col text-sm gap-y-1">
              <span className="text-secondary-800 font-bold">{user?.name}</span>
              <span className="text-secondary-800">{user?.phoneNumber}</span>
            </div>
          </div>
          {user?.role === "ADMIN" ? <AdminSideBar /> : <UserSideBar />}
        </div>
      )}
      {isMenuToggle && (
        <div className="flex flex-col transition-all duration-300 ease-in-out absolute top-0 bottom-0 right-0 overflow-y-auto bg-white w-52 h-screen rounded">
          <div className="flex items-center justify-center gap-x-6 mt-4 pb-4 border-b-2 border-gray-200 w-full">
            <Link href="/">
              <Image
                src="/images/Avid-logo.png"
                width={120}
                height={45}
                alt="avid logo"
              />
            </Link>
            <button onClick={() => setIsMenuToggle(!isMenuToggle)}>
              <RiCloseLine className="icon" />
            </button>
          </div>
          {pathname.includes("/admin") ? (
            <AdminSideBar />
          ) : pathname.includes("/profile") ? (
            <UserSideBar />
          ) : (
            <ul className="flex flex-col gap-y-4 p-2 pb-3">
              <li
                className={pathname === "/" ? "nav__list__active" : "nav__list"}
              >
                <Link href="/" className="cursor-pointer flex gap-x-2">
                  <GoHome className="icon" />
                  صفحه اصلی
                </Link>
              </li>
              <li
                className={
                  pathname === "/products" ? "nav__list__active" : "nav__list"
                }
              >
                <Link href="/products" className="cursor-pointer flex gap-x-2">
                  <FaBoxOpen className="icon" />
                  محصولات
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
