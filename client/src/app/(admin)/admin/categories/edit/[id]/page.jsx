"use client";

import Loading from "@/common/loading";
import CategoryForm, { categoryTypes } from "@/components/CategoryForm";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { includeObj } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const includesCategoryKeys = ["title", "englishTitle", "description"];

function UpdateCategoryPage() {
  const { id } = useParams();
  const { data, isLoading: isLoadingCategory } = useGetCategoryById(id);
  const { category } = data || {};
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const { isLoading, mutateAsync } = useUpdateCategory();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setFormData(includeObj(category, includesCategoryKeys));
      setSelectedType(categoryTypes.find((cat) => cat.value === category.type));
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        data: { ...formData, type: selectedType.value },
        id: category._id,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoadingCategory) return <Loading />;

  return (
    <div className="max-w-lg w-full">
      <h1 className="text-xl font-bold mb-6">ویرایش دسته بندی</h1>
      <CategoryForm
        formData={formData}
        setFormData={setFormData}
        selectedType={categoryTypes.find((cat) => cat.value === category.type)}
        setSelectedType={setSelectedType}
        onSubmit={submitHandler}
        isLoading={isLoading}
        btnLabel="ویرایش کردن دسته بندی"
      />
    </div>
  );
}

export default UpdateCategoryPage;
