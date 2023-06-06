import { getAllPayments, getPaymentById } from "@/services/adminServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () =>
  useQuery({
    queryKey: ["get-payments"],
    queryFn: getAllPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPaymentById = (id) =>
  useQuery({
    queryKey: ["get-payment", id],
    queryFn: () => getPaymentById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
