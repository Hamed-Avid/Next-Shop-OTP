"use client";

import { userListTHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import Link from "next/link";
import { HiEye } from "react-icons/hi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

function UsersTable({ users }) {
  return (
    <div className="border rounded-2xl scrollbar overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm text-secondary-800">
        <thead>
          <tr className="bg-gray-300">
            {userListTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, index) => (
              <tr key={item._id} className="bg-white">
                <td className="table__td">{++index}</td>
                <td className="table__td">{item.name}</td>
                <td className="table__td">{item.email}</td>
                <td className="table__td">
                  <div className="flex items-center whitespace-nowrap gap-x-2">
                    {toPersianNumbers(item.phoneNumber)}
                    {item.isVerifiedPhoneNumber && (
                      <IoShieldCheckmarkSharp className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {item.Products.map((product, index) => (
                      <span key={index} className="badge badge--secondary">
                        {product.title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(item.createdAt)}
                </td>
                <td className="table__td">
                  <Link
                    href={`/admin/users/${item._id}`}
                    className="flex justify-center"
                  >
                    <HiEye className="w-6 h-6 text-primary-900" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
