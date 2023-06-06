import { adminPaymentTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import Link from "next/link";
import { HiEye } from "react-icons/hi";

function PaymentTable({ payments }) {
  return (
    <div className="border rounded-2xl overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr className="bg-gray-300">
            {adminPaymentTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, index) => (
              <tr key={item._id} className="bg-white">
                <td className="table__td">{++index}</td>
                <td className="table__td whitespace-nowrap truncate">
                  {item.invoiceNumber}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {item.description}
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2">
                    <span>{item.user.name}</span>
                    <span>{item.user.email}</span>
                    <span className="font-bold">
                      {toPersianNumbers(item.user.phoneNumber)}
                    </span>
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {item.cart.productDetail.map((product, index) => (
                      <span key={index} className="badge badge--secondary">
                        {product.title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(item.amount)}
                </td>
                <td className="table__td">
                  {toLocalDateString(item.createdAt)}
                </td>
                <td className="table__td">
                  {item.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge--error">ناموفق</span>
                  )}
                </td>
                <td className="table__td">
                  <Link
                    href={`/admin/payments/${item._id}`}
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

export default PaymentTable;
