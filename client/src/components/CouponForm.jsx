"use client";

import RadioInput from "@/common/RadioInput";
import Loading from "@/common/loading";
import TextField from "@/common/textField";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const couponsFormData = [
  {
    id: 1,
    label: "کد",
    name: "code",
  },
  {
    id: 2,
    label: "مقدار",
    name: "amount",
  },
  {
    id: 3,
    label: "ظرفیت",
    name: "usageLimit",
  },
];

function CouponForm({
  formData,
  setFormData,
  type,
  setType,
  isLoading,
  btnLabel,
  onSubmit,
  products,
  productIds,
  setProductIds,
  expireDate,
  setExpireDate,
  defaultValue = "",
}) {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      {couponsFormData.map((item) => (
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
        <label className="mb-2">نوع کد تخفیف</label>
        <div className="flex items-center justify-between">
          <RadioInput
            checked={type === "percent"}
            id="percent-type"
            name="type"
            label="درصد"
            value="percent"
            onchange={(e) => setType(e.target.value)}
          />
          <RadioInput
            checked={type === "fixedProduct"}
            id="fixedProduct-type"
            name="type"
            label="قیمت ثابت"
            value="fixedProduct"
            onchange={(e) => setType(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="products" className="mb-2">
          محصولات
        </label>
        <Select
          isMulti
          id="products"
          onChange={setProductIds}
          options={products}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={defaultValue}
        />
      </div>

      <div>
        <label className="m-2">تاریخ اتمام تخفیف</label>
        <DatePicker
          inputClass="textField__input"
          value={expireDate}
          onChange={(date) => setExpireDate(date)}
          format="YYYY/MM/DD"
          calendar={persian}
          locale={persian_fa}
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

export default CouponForm;
