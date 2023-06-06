"use client";

import { likeProduct } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function LikeProduct({ productId, isLiked }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(productId);
      toast.success(message);
      router.refresh(pathname + "?" + useSearchParams.toString());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <button onClick={likeHandler}>
        {isLiked ? (
          <FcLike className="w-6 h-6" />
        ) : (
          <FcLikePlaceholder className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default LikeProduct;
