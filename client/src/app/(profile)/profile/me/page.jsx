"use client";

import Loading from "@/common/loading";
import TextField from "@/common/textField";
import { useGetUser } from "@/hooks/useAuth";
import { updateUserProfile } from "@/services/authServices";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";

function MePage() {
  const includesKey = ["name", "email", "biography"];
  const labels = ["نام و نام خانوادگی", "ایمیل", "حوضه تخصصی"];
  const [formData, setFormData] = useState({});
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateUserProfile,
  });

  useEffect(() => {
    if (user) setFormData(includeObj(user, includesKey));
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div
      className="max-w-md bg-white rounded-2xl p-4 mb-8"
      onSubmit={submitHandler}
    >
      <h1 className="font-bold text-xl text-secondary-800 mb-6">اطلاعات حساب</h1>
      <p className="text-sm mb-8 flex items-center gap-x-2">
        <BsFillInfoCircleFill className="icon text-secondary-500" />
        شماره موبایل قابل ویرایش نیست
      </p>
      <form className="space-y-8">
        {Object.keys(includeObj(user, includesKey))
          .reverse()
          .map((item, index) => (
            <TextField
              key={index}
              label={labels[index]}
              name={item}
              value={formData[item] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          ))}

        {isUpdating ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        )}
      </form>
    </div>
  );
}

export default MePage;
