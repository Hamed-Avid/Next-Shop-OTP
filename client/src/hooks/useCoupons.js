import {
  addNewCoupon,
  getAllCoupons,
  getCouponById,
  removeCoupon,
  updateCoupon,
} from "@/services/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCouponById = (id) =>
  useQuery({
    queryKey: ["get-coupon"],
    queryFn: () => getCouponById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddNewCoupon = () => useMutation({ mutationFn: addNewCoupon });

export const useUpdateCoupon = () => useMutation({ mutationFn: updateCoupon });

export const useRemoveCoupon = () => useMutation({ mutationFn: removeCoupon });
