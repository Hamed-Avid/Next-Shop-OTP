"use client";

import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsSortUp } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const sortOptions = [
  { id: 1, value: "latest", label: "جدید ترین" },
  { id: 2, value: "earliest", label: "قدیمی ترین" },
  { id: 3, value: "popular", label: "محبوب ترین" },
];

function ProductsSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <div className="bg-white rounded-xl p-3 transition-all duration-200 ease-in-out">
      <div
        onClick={() => setIsToggle(!isToggle)}
        className="font-bold flex justify-between"
      >
        <div className="flex justify-between whitespace-nowrap">
          <BsSortUp className="icon" />
          <p className="px-1"> مرتب سازی</p>
        </div>
        {isToggle ? (
          <RiArrowUpSLine className="icon" />
        ) : (
          <RiArrowDownSLine className="icon" />
        )}
      </div>
      <ul
        className={`${
          isToggle ? "block" : "hidden"
        } border-t-[1px] mt-3 pt-2 space-y-4`}
      >
        {sortOptions.map((item) => (
          <li key={item.id}>
            <RadioInput
              id={item.id}
              label={item.label}
              name="product-sort"
              value={item.value}
              onchange={sortHandler}
              checked={sort === item.value}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsSort;
