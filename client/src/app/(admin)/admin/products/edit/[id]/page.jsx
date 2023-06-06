"use client";

import Loading from "@/common/loading";
import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { includeObj } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const includesProductKey = [
  "title",
  "description",
  "slug",
  "brand",
  "price",
  "offPrice",
  "discount",
  "countInStock",
  "imageLink",
];

function EditProductPage() {
  const { id } = useParams();
  const { data: productData, isLoading: isLoadingProduct } =
    useGetProductById(id);
  const { product } = productData || {};
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const { isLoading, mutateAsync } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setTags(product.tags);
      setSelectedCategory(product.category);
      setFormData(includeObj(product, includesProductKey));
    }
    console.log(product);
  }, [productData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  console.log(selectedCategory);

  if (isLoadingProduct) return <Loading />;

  return (
    <div className="max-w-lg mb-10">
      <h1 className="text-xl font-bold mb-4">ویرایش محصول</h1>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={product.category}
        tags={tags}
        setTags={setTags}
        isLoading={isLoading}
        onSubmit={submitHandler}
        btnLabel="ویرایش کردن محصول"
      />
    </div>
  );
}

export default EditProductPage;
