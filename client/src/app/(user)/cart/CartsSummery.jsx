import Loading from "@/common/loading";
import { createPayment } from "@/services/peymentService";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function CartsSummery({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });
  const queryClient = useQueryClient();

  const paymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border p-2 rounded-xl">
      <p className="font-bold mb-4">اطلاعات پرداخت</p>
      <div className="flex items-center justify-between mb-4">
        <span>جمع کل</span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span>تخفیف</span>
        <span>{toPersianNumbersWithComma(totalOffAmount)} -</span>
      </div>
      <div className="flex items-center justify-between mb-6 font-bold">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumbersWithComma(totalPrice)}</span>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <button onClick={paymentHandler} className="btn btn--primary w-full">
          ثبت سفارش
        </button>
      )}
    </div>
  );
}

export default CartsSummery;
