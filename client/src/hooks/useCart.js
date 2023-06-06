import { addToCart, decrementFromCart } from "@/services/cartServices";
import { useMutation } from "@tanstack/react-query";

export function useAddToCart() {
  return useMutation({ mutationFn: addToCart });
}

export function useDecrementFromCart() {
  return useMutation({
    mutationFn: decrementFromCart,
  });
}
