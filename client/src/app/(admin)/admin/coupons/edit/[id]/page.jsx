"use client";

import Loading from "@/common/loading";
import CouponForm from "@/components/CouponForm";
import { useGetCouponById, useUpdateCoupon } from "@/hooks/useCoupons";
import { useGetAllProducts } from "@/hooks/useProducts";
import { includeObj } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const includesCouponKey = ["code", "amount", "usageLimit"];

function UpdateCouponPage() {
  const { id } = useParams();
  const { isLoading: isLoadingCoupon, data: couponData } = useGetCouponById(id);
  const { coupon } = couponData || {};
  const { data: productData } = useGetAllProducts();
  const { products } = productData || {};
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [productIds, setProductIds] = useState([]);
  const { isLoading, mutateAsync } = useUpdateCoupon();
  const router = useRouter();

  useEffect(() => {
    if (coupon) {
      setType(coupon.type);
      setProductIds(coupon.productIds);
      setExpireDate(new Date(coupon.expireDate));
      setFormData(includeObj(coupon, includesCouponKey));
    }
  }, [couponData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: coupon._id,
        data: {
          ...formData,
          type,
          expireDate: new Date(expireDate).toISOString(),
          productIds: productIds.map((product) => product._id),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoadingCoupon) return <Loading />;

  return (
    <div className="max-w-lg mb-10">
      <h1 className="text-xl font-bold mb-4">ویرایش کد تخفیف</h1>
      <CouponForm
        formData={formData}
        setFormData={setFormData}
        type={type}
        setType={setType}
        products={products}
        productIds={productIds}
        setProductIds={setProductIds}
        defaultValue={coupon.productIds}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        onSubmit={submitHandler}
        isLoading={isLoading}
        btnLabel="ویرایش کردن کد تخفیف"
      />
    </div>
  );
}

export default UpdateCouponPage;
