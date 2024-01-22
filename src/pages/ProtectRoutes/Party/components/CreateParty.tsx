import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";
import Select from "react-select";

// utils
import { toastSuccess, toastError } from "../../../../utils/toastExtra";
import renewToken from "../../../../utils/renewToken";

// hooks
import useAxios from "../../../../hooks/useAxios";

// global component
import Reload from "../../../../components/Reload";

// interface
import { FormBody } from "../types/CreatePartyTypes";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector, useAppDispatch } from "../../../../store/hook";
import { loginRedux } from "../../../../store/userSlice";

// global types
import { ErrorResponse } from "../../../../types/ErrorResponseTypes";

const CreateParty = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state: RootState) => state.users);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormBody>();

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

    setIsSubmit(true);
    setIsLoading(true);

    try {
      await useAxios("/party", "post", body, true);
      const updateUser = await useAxios(
        "/auth/detail-user",
        "get",
        false,
        true
      );
      dispatch(loginRedux(updateUser.data.data));
      toastSuccess("สร้างปาร์ตี้เรียบร้อย");
      setIsLoading(false);
      setIsLoading(false);

      setTimeout(() => {
        setState(1);
      }, 2500);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;

        if (data.message === "token expired") {
          try {
            await renewToken();
            await useAxios("/party", "post", body, true);
            const updateUser = await useAxios(
              "/auth/detail-user",
              "get",
              false,
              true
            );
            dispatch(loginRedux(updateUser.data.data));
            toastSuccess("สร้างปาร์ตี้เรียบร้อย");
            setIsSubmit(false);
            setIsLoading(false);
            setTimeout(() => {
              setState(1);
            }, 2500);
          } catch (error) {
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            setIsSubmit(false);
            setIsLoading(false);
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          toastError("เกิดข้อผิดพลาด");
          setIsSubmit(false);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading ? <Reload /> : null}
      <main className="w-full">
        <div className="text-3xl text-center font-semibold">สร้างปาร์ตี้</div>
        <form
          className="max-w-4xl w-full mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-1 flex flex-col">
            <label className="text-lg">
              ชื่อปาร์ตี้ <span className=" text-red-600">*</span>
            </label>
            <input
              type="text"
              className={`w-full rounded-md p-2 mb-1 text-lg text-gray-700 outline-none bg-slate-50 focus:border-blue-500 ${
                errors.name
                  ? "border border-red-600"
                  : "border border-slate-300"
              }`}
              {...register("name", { required: true })}
            />
            {errors.name ? (
              <span className="mt-1 text-red-500">โปรดกรอกชื่อปาร์ตี้</span>
            ) : null}
          </div>

          <div className="p-1 flex flex-col md:flex-row gap-2">
            <div className="flex flex-col">
              <label className="text-lg">
                จำนวนคน <span className=" text-red-600">*</span>
              </label>
              <input
                type="number"
                className={`w-full rounded-md p-2 mb-1 text-lg text-gray-700 outline-none bg-slate-50 focus:border-blue-500 ${
                  errors.limit
                    ? "border border-red-600"
                    : "border border-slate-300"
                }`}
                {...register("limit", { required: true, min: 1, max: 10e6 })}
              />
              {errors.limit?.type === "required" ? (
                <span className="mt-1 text-red-500">โปรดกรอกจำนวนคน</span>
              ) : null}
              {errors.limit?.type === "min" ? (
                <span className="mt-1 text-red-500">จำนวนคนต้องมากกว่า 0</span>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-lg">
                ระยะเวลาเล่นเกม (หน่วยนาที){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                className={`w-full rounded-md p-2 mb-1 text-lg text-gray-700 outline-none bg-slate-50 focus:border-blue-500 ${
                  errors.duration
                    ? "border border-red-600"
                    : "border border-slate-300"
                }`}
                {...register("duration", {
                  required: true,
                  min: 1,
                  max: 1440,
                })}
              />
              {errors.duration?.type === "required" ? (
                <span className="mt-1 text-red-500">
                  โปรดกรอกระยะเวลาเล่นเกม
                </span>
              ) : null}
              {errors.duration?.type === "min" ? (
                <span className="mt-1 text-red-500">
                  ระยะเวลาเล่นเกมต้องมากกว่า 0
                </span>
              ) : null}
            </div>

            <div className="flex flex-col flex-grow">
              <label className="text-lg">
                สถานที่ <span className=" text-red-600">*</span>
              </label>
              <input
                type="text"
                className={`w-full rounded-md p-2 mb-1 text-lg text-gray-700 bg-slate-50 focus:border-blue-500 ${
                  errors.place
                    ? "border border-red-600"
                    : "border border-slate-300"
                }`}
                {...register("place", { required: true })}
              />
              {errors.place ? (
                <span className="mt-1 text-red-500">โปรดกรอกสถานที่</span>
              ) : null}
            </div>
          </div>

          <div className="p-1">
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
                  className={`w-full mb-1 text-lg text-gray-700 outline-none focus:border-blue-500`}
                  styles={{
                    control: (baseStyles) => {
                      return {
                        ...baseStyles,
                        borderColor: "#cbd5e1",
                        backgroundColor: "#f8fafc",
                        borderRadius: "0.375rem",
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
              className="w-full rounded-md p-2 mb-1 text-lg text-gray-700 bg-slate-50 border-slate-300 focus:border-blue-500"
              {...register("description", { required: false })}
            />
          </div>

          <div className="mt-8 text-end">
            <button
              className={`${
                isSubmit || selector.ownerParty || selector.memberParty
                  ? "bg-gray-500"
                  : "bg-primary"
              } py-2 px-4 hover:bg-green-500 text-white rounded-md text-md transition ease-in duration-150`}
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
      </main>
    </React.Fragment>
  );
};

export default CreateParty;
