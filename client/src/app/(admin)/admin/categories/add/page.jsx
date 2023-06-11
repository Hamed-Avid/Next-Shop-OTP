"use client";

import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function AddCategoryPage() {
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const { isLoading, mutateAsync } = useAddCategory();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        type: selectedType.value,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-lg w-full">
      <h1 className="text-xl font-bold text-secondary-800 mb-6">
        افزودن دسته بندی جدید
      </h1>
      <CategoryForm
        formData={formData}
        setFormData={setFormData}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onSubmit={submitHandler}
        isLoading={isLoading}
        btnLabel="اضافه کردن دسته بندی"
      />
    </div>
  );
}

export default AddCategoryPage;
