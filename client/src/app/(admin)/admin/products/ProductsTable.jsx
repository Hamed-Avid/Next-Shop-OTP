import { productListTHeads } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import Link from "next/link";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

function ProductsTable({ products, removeHandler }) {
  return (
    <div className="border rounded-2xl overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr className="bg-gray-300">
            {productListTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, index) => (
              <tr key={item._id} className="bg-white">
                <td className="table__td">{++index}</td>
                <td className="table__td">{item.title}</td>
                <td className="table__td">{item.category.title}</td>
                <td className="table__td">
                  {toPersianNumbersWithComma(item.price)}
                </td>
                <td className="table__td">{toPersianNumbers(item.discount)}</td>
                <td className="table__td">
                  {toPersianNumbersWithComma(item.offPrice)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(item.countInStock)}
                </td>
                <td className="table__td">
                  <div className="flex gap-x-4">
                    <Link href={`/admin/products/${item._id}`}>
                      <FaEye className="w-6 h-6 text-primary-900" />
                    </Link>
                    <button onClick={() => removeHandler(item._id)}>
                      <FaTrashAlt className="w-6 h-6 text-rose-500" />
                    </button>
                    <Link href={`/admin/products/edit/${item._id}`}>
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

export default ProductsTable;
