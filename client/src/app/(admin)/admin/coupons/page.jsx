"use client";
import { useGetAllCoupons, useRemoveCoupon } from "@/hooks/useCoupons";
import CouponsTable from "./CouponsTable";
import Loading from "@/common/loading";
import { HiPlusCircle } from "react-icons/hi";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function CouponsPage() {
  const { isLoading, data } = useGetAllCoupons();
  const { coupons } = data || {};
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold mb-5">کد های تخفیف</h1>
        <Link
          href="/admin/coupons/add"
          className="flex items-center gap-x-2 text-primary-900 font-bold"
        >
          <HiPlusCircle className="w-6 h-6" />
          <span>اضافه کردن کد تخفیف</span>
        </Link>
      </div>
      <CouponsTable coupons={coupons} removeHandler={removeHandler} />
    </div>
  );
}

export default CouponsPage;
