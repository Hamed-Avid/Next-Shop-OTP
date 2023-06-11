import { couponListTHeads } from "@/constants/tableHeads";
import { toLocalDateString, toLocalDateStringShort } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import Link from "next/link";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

function CouponsTable({ coupons, removeHandler }) {
  return (
    <div className="border rounded-2xl scrollbar overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm text-secondary-800">
        <thead>
          <tr className="bg-gray-300">
            {couponListTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, index) => (
              <tr key={item._id} className="bg-white">
                <td className="table__td">{++index}</td>
                <td className="table__td">{item.code}</td>
                <td className="table__td">
                  <span className="badge badge--primary"> {item.type}</span>
                </td>
                <td className="table__td">{toPersianNumbers(item.amount)}</td>
                <td className="table__td">
                  <div className="flex flex-col items-center gap-y-2">
                    {item.productIds.map((product) => (
                      <span
                        key={product._id}
                        className="badge badge--secondary"
                      >
                        {product.title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="table__td">
                  {toPersianNumbers(item.usageCount)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(item.usageLimit)}
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(item.expireDate)}
                </td>
                <td className="table__td">
                  <div className="flex gap-x-4">
                    <Link href={`/admin/coupons/${item._id}`}>
                      <FaEye className="w-6 h-6 text-primary-900" />
                    </Link>
                    <button onClick={() => removeHandler(item._id)}>
                      <FaTrashAlt className="w-6 h-6 text-rose-500" />
                    </button>
                    <Link href={`/admin/coupons/edit/${item._id}`}>
                      <FiEdit3 className="w-6 h-6" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CouponsTable;
