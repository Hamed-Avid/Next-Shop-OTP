"use client";

import Loading from "@/common/loading";
import TextField from "@/common/textField";
import Select from "react-select";

export const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];

const categoriesFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "عنوان انگلیسی",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "توضیحات",
    name: "description",
  },
];

function CategoryForm({
  formData,
  setFormData,
  selectedType,
  setSelectedType,
  onSubmit,
  isLoading,
  btnLabel,
}) {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      {categoriesFormData.map((item) => (
        <TextField
          key={item.id}
          label={item.label}
          name={item.name}
          value={formData[item.name] ?? ""}
          onChange={({ target }) =>
            setFormData({ ...formData, [target.name]: target.value })
          }
        />
      ))}
      <div>
        <label htmlFor="type" className="text-secondary-800 pb-2">
          نوع
        </label>
        <Select
          id="type"
          onChange={setSelectedType}
          options={categoryTypes}
          defaultValue={selectedType}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <button type="submit" className="btn btn--primary w-full">
          {btnLabel}
        </button>
      )}
    </form>
  );
}

export default CategoryForm;
