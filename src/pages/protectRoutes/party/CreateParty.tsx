// library
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";
import { toastSuccess, toastError } from "../../../utils/toastExtra";

// component
import Reload from "../../../components/Reload";

// interface
import { FormBody } from "./CreateParty.interface";

// redux
import type { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hook";

const CreateParty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormBody>();

  const selector = useAppSelector((state: RootState) => state.users);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormBody> = async (data) => {
    try {
      setIsSubmit(true);
      setIsLoading(true);
      await axiosExtra(
        "/party",
        "post",
        {
          ...data,
          limit: parseInt(data.limit),
          duration: parseInt(data.duration),
        },
        true
      );

      setIsLoading(false);
      toastSuccess("สร้างปาร์ตี้เรียบร้อย");
      setTimeout(() => {
        window.location.reload();
        setIsSubmit(false);
      }, 2000);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      toastError("มีข้อผิดพลาด โปรดทำรายการใหม่");
      setTimeout(() => {
        setIsSubmit(false);
      }, 2000);
    }
  };

  return (
    <div>
      {isLoading ? <Reload /> : null}
      <div className="text-2xl text-center font-semibold">สร้างปาร์ตี้</div>
      <form
        className="p-2 max-w-4xl w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-1 flex flex-col">
          <label className="text-lg">ชื่อปาร์ตี้</label>
          <input
            type="text"
            className={`mt-1 rounded focus:ring-1 text-lg ${
              errors.name ? "border border-red-600" : "border"
            }`}
            {...register("name", { required: true })}
          />
          {errors.name ? (
            <span className="mt-1 text-red-500">โปรดกรอกชื่อปาร์ตี้</span>
          ) : null}
        </div>

        <div className="p-1 flex flex-col lg:flex-row gap-x-2">
          <div className="flex flex-col">
            <label className="text-lg">จำนวนคน</label>
            <input
              type="number"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.limit ? "border border-red-600" : "border"
              }`}
              {...register("limit", { required: true, min: 1, max: 10e6 })}
            />
            {errors.limit ? (
              <span className="mt-1 text-red-500">โปรดกรอกจำนวนคน</span>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="text-lg">ระยะเวลาเล่นเกม</label>
            <input
              type="number"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.duration ? "border border-red-600" : "border"
              }`}
              {...register("duration", {
                required: true,
                min: 0,
                max: 1440,
              })}
            />
            {errors.duration ? (
              <span className="mt-1 text-red-500">โปรดกรอกระยะเวลาเล่นเกม</span>
            ) : null}
          </div>

          <div className="flex flex-col flex-grow">
            <label className="text-lg">ประเภทบอร์ดเกม</label>
            <input
              type="text"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.category ? "border border-red-600" : "border"
              }`}
              {...register("category", { required: true })}
            />
            {errors.category ? (
              <span className="mt-1 text-red-500">โปรดกรอกประเภทบอร์ดเกม</span>
            ) : null}
          </div>
        </div>

        <div className="p-1 flex flex-col">
          <label className="text-lg">สถานที่</label>
          <input
            type="text"
            className={`mt-1 rounded focus:ring-1 text-lg ${
              errors.place ? "border border-red-600" : "border"
            }`}
            {...register("place", { required: true })}
          />
          {errors.place ? (
            <span className="mt-1 text-red-500">โปรดกรอกสถานที่</span>
          ) : null}
        </div>

        <div className="mt-8 text-end">
          <button
            className={`${
              isSubmit || selector.ownerParty || selector.memberParty
                ? "bg-gray-500"
                : "bg-limegreen"
            } text-white p-2 rounded`}
            disabled={
              isSubmit || selector.ownerParty || selector.memberParty
                ? true
                : false
            }
          >
            สร้างปาร์ตี้
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateParty;
