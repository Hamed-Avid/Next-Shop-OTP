"use client";

import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";
import { RiCloseLine } from "react-icons/ri";

function TopBar({ categories }) {
  const [isFilterToggle, setIsFilterToggle] = useState(false);
  const [isSortToggle, setIsSortToggle] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-x-3">
        <button
          onClick={() => {
            setIsFilterToggle(!isFilterToggle);
            setIsSortToggle(false);
          }}
          className="border-2 rounded-2xl py-2 px-10 whitespace-nowrap"
        >
          دسته بندی
        </button>
        <button
          onClick={() => {
            setIsSortToggle(!isSortToggle);
            setIsFilterToggle(false);
          }}
          className="border-2 rounded-2xl py-2 px-10 whitespace-nowrap"
        >
          مرتب سازی
        </button>
      </div>

      <div
        className={`${
          isFilterToggle || isSortToggle ? "block" : "hidden"
        } fixed top-28 right-0 left-0 overflow-y-auto transition-all duration-700 ease-in-out bg-slate-200 h-full rounded-3xl w-full p-5`}
      >
        <button
          onClick={() => {
            setIsFilterToggle(false);
            setIsSortToggle(false);
          }}
          className="fixed left-5"
        >
          <RiCloseLine className="icon" />
        </button>
        <div className="mt-10">
          {isFilterToggle && <ProductsFilter categories={categories} />}
          {isSortToggle && <ProductsSort />}
        </div>
        <button
          onClick={() => {
            setIsFilterToggle(false);
            setIsSortToggle(false);
          }}
          className="btn btn--primary w-full mt-8"
        >
          اعمال فیلتر
        </button>
      </div>
    </>
  );
}

export default TopBar;
