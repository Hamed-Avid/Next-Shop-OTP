"use client";

import { useGetUser } from "@/hooks/useAuth";
import { likeProduct } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function LikeProduct({ productId, isLiked = false, likes = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useGetUser();
  const { user } = data || {};

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
        {isLiked || likes?.includes(user?._id) ? (
          <FcLike className="w-6 h-6" />
        ) : (
          <FcLikePlaceholder className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default LikeProduct;
