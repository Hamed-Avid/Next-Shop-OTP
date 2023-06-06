"use client";

import CouponsForm from "@/components/CouponForm";
import { useAddNewCoupon } from "@/hooks/useCoupons";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function AddCoupon() {
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("percent");
  const { data } = useGetAllProducts();
  const { products } = data || {};
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());
  const { isLoading, mutateAsync } = useAddNewCoupon();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        type,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map((product) => product._id),
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mb-8 w-full">
      <h1 className="mb-8 text-xl font-bold">کد تخفیف جدید</h1>
      <CouponsForm
        formData={formData}
        setFormData={setFormData}
        type={type}
        setType={setType}
        products={products}
        productIds={productIds}
        setProductIds={setProductIds}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        onSubmit={submitHandler}
        isLoading={isLoading}
        btnLabel="اضافه کردن کد تخفیف"
      />
    </div>
  );
}

export default AddCoupon;
