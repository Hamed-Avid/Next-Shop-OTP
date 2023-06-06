"use client";

import { useGetCategories } from "@/hooks/useCategories";
import { useState } from "react";
import { useAddProduct } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

function AddProductPage() {
  const [formData, setFormData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const { data } = useGetCategories();
  const { categories } = data || {};
  const { isLoading, mutateAsync } = useAddProduct();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mb-8 w-full">
      <h1 className="mb-8 text-xl font-bold">محصول جدید</h1>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        setTags={setTags}
        isLoading={isLoading}
        onSubmit={submitHandler}
        btnLabel="اضافه کردن محصول"
      />
    </div>
  );
}

export default AddProductPage;
