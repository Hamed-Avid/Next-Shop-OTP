import { userPaymentTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";

function PaymentTable({ payments }) {
  return (
    <div className="border rounded-2xl scrollbar overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm text-secondary-800">
        <thead>
          <tr className="bg-gray-200/80">
            {userPaymentTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <tr key={item._id} className="bg-white">
                <td className="table__td whitespace-nowrap truncate">
                  {item.invoiceNumber}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {item.description}
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
                <td className="table__td whitespace-nowrap">
                  {toLocalDateString(item.createdAt)}
                </td>
                <td className="table__td">
                  {item.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge--error">ناموفق</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
