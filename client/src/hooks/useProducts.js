import {
  addNewProduct,
  removeProduct,
  updateProduct,
} from "@/services/adminServices";
import { getProductById, getProducts } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => useMutation({ mutationFn: addNewProduct });

export const useUpdateProduct = () =>
  useMutation({ mutationFn: updateProduct });

export const useRemoveProduct = () =>
  useMutation({ mutationFn: removeProduct });
