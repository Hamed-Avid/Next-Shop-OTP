"use Client";

import TextField from "@/common/textField";
import { TagsInput } from "react-tag-input-component";
import Select from "react-select";
import Loading from "@/common/loading";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت با تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

function ProductForm({
  formData,
  setFormData,
  tags,
  setTags,
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoading,
  onSubmit,
  btnLabel,
}) {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      {productsFormData.map((item) => (
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
        <label htmlFor="tags" className="mb-2">
          تگ های محصول
        </label>
        <TagsInput
          id="tags"
          value={tags}
          onChange={setTags}
          name="tags"
          placeHolder="تگ"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2">
          دسته بندی
        </label>
        <Select
          id="category"
          onChange={setSelectedCategory}
          options={categories}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={selectedCategory}
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

export default ProductForm;
