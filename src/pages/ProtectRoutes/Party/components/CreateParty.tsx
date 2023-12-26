import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import Papa from "papaparse";
import axios from "axios";

// utils
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import { VITE_BASE } from "../../../../utils/getEnv";

// hooks
import useAxios from "../../../../hooks/useAxios";

// global component
import Reload from "../../../../components/Reload";

// interface
import { FormBody } from "../types/CreatePartyTypes";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../store/hook";

const CreateParty = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormBody>();

  const selector = useAppSelector((state: RootState) => state.users);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    getBoardgames();
  }, []);

  const getBoardgames = async () => {
    try {
      const result = await useAxios("/boardgames", "get", false, true);

      let boardgames = result.data.data;
      boardgames = boardgames.map((boardgame: any) => ({
        label: boardgame.game,
        value: boardgame.game,
      }));

      setOptions(boardgames);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormBody> = async (data) => {
    // manage category
    if (!data.category) {
      data.category = [];
    } else {
      data.category = data.category.map((e) => {
        return e.value;
      });
    }

    // manage data
    if (!data.description) {
      delete data.description;
    }

    const body = {
      ...data,
      limit: parseInt(data.limit),
      duration: parseInt(data.duration),
    };

    try {
      setIsSubmit(true);
      setIsLoading(true);
      await useAxios("/party", "post", body, true);

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
          <label className="text-lg">
            ชื่อปาร์ตี้ <span className=" text-red-600">*</span>
          </label>
          <input
            type="text"
            className={`mt-1 rounded focus:ring-1 text-lg ${
              errors.name
                ? "border border-red-600"
                : "border border-neutral-600"
            }`}
            {...register("name", { required: true })}
          />
          {errors.name ? (
            <span className="mt-1 text-red-500">โปรดกรอกชื่อปาร์ตี้</span>
          ) : null}
        </div>

        <div className="p-1 flex flex-col lg:flex-row gap-2">
          <div className="flex flex-col">
            <label className="text-lg">
              จำนวนคน <span className=" text-red-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.limit
                  ? "border border-red-600"
                  : "border border-neutral-600"
              }`}
              {...register("limit", { required: true, min: 1, max: 10e6 })}
            />
            {errors.limit?.type === "required" ? (
              <span className="mt-1 text-red-500">โปรดกรอกจำนวนคน</span>
            ) : null}
            {errors.limit?.type === "min" ? (
              <span className="mt-1 text-red-500">จำนวนคนต้องมากกว่า 1</span>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="text-lg">
              ระยะเวลาเล่นเกม (หน่วยนาที){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              min="0"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.duration
                  ? "border border-red-600"
                  : "border border-neutral-600"
              }`}
              {...register("duration", {
                required: true,
                min: 0,
                max: 1440,
              })}
            />
            {errors.duration?.type === "required" ? (
              <span className="mt-1 text-red-500">โปรดกรอกระยะเวลาเล่นเกม</span>
            ) : null}
            {errors.duration?.type === "min" ? (
              <span className="mt-1 text-red-500">
                ระยะเวลาเล่นเกมห้ามเป็นค่าติดลบ
              </span>
            ) : null}
          </div>

          <div className="flex flex-col flex-grow">
            <label className="text-lg">
              สถานที่ <span className=" text-red-600">*</span>
            </label>
            <input
              type="text"
              className={`mt-1 rounded focus:ring-1 text-lg ${
                errors.place
                  ? "border border-red-600"
                  : "border border-neutral-600"
              }`}
              {...register("place", { required: true })}
            />
            {errors.place ? (
              <span className="mt-1 text-red-500">โปรดกรอกสถานที่</span>
            ) : null}
          </div>
        </div>

        <div className="p-1 flex flex-col flex-grow">
          <label className="text-lg">บอร์ดเกมที่ต้องการเล่น</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={options}
                placeholder={false}
                className={`mt-1 rounded focus:ring-1 text-lg`}
                styles={{
                  control: (baseStyles) => {
                    return {
                      ...baseStyles,
                      borderColor: "#525252",
                    };
                  },
                }}
              />
            )}
          />
        </div>

        <div className="p-1 flex flex-col">
          <label className="text-lg">รายละเอียด</label>
          <textarea
            rows={3}
            className={`mt-1 rounded focus:ring-1 text-lg`}
            {...register("description", { required: false })}
          />
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
