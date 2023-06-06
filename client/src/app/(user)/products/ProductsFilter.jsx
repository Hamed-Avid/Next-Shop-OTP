"use client";

import CheckBox from "@/common/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { MdWindow } from "react-icons/md";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

function ProductsFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );
  const [isToggle, setIsToggle] = useState(false);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      const selected = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(selected);
      router.push(pathname + "?" + createQueryString("category", selected));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-3 transition-all duration-200 ease-in-out">
      <div
        onClick={() => setIsToggle(!isToggle)}
        className="font-bold flex justify-between"
      >
        <div className="flex justify-between whitespace-nowrap">
          <MdWindow className="icon" />
          <p className="px-1"> دسته بندی</p>
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
        {categories.map((item) => (
          <li key={item._id}>
            <CheckBox
              id={item._id}
              label={item.title}
              name="product-category"
              value={item.englishTitle}
              onchange={categoryHandler}
              checked={selectedCategories.includes(item.englishTitle)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsFilter;
