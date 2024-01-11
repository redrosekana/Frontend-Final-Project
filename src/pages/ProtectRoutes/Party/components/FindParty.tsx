import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";
import Cookies from "universal-cookie";
import { isAxiosError } from "axios";

// hooks
import useAxios from "../../../../hooks/useAxios";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../store/hook";

// types
import { PartyItem } from "../types/FindPartyTypes";

// component
import CardParty from "./CardParty";

// global component
import Reload from "../../../../components/Reload";

// global types
import { ErrorResponse } from "../../../../types/ErrorResponseTypes";

// utils
import renewToken from "../../../../utils/renewToken";
import { toastError } from "../../../../utils/toastExtra";

const FindParty = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  const selector = useAppSelector((state: RootState) => state.users);
  const cookies = new Cookies();

  const [parties, setParties] = useState<PartyItem[]>([]);
  const [informationPaginate, setInformationPaginate] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [reload, setReload] = useState<boolean>(true);

  useEffect(() => {
    useAxios("/party?limit=3&page=1", "get", false, true)
      .then((result) => {
        setInformationPaginate(result.data.data.information);
        setParties(result.data.data.parties);
        setReload(false);
      })
      .catch(async (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data as ErrorResponse;
          if (data.message === "token expired") {
            try {
              await renewToken();
              const result = await useAxios(
                "/party?limit=3&page=1",
                "get",
                false,
                true
              );
              setInformationPaginate(result.data.data.information);
              setParties(result.data.data.parties);
              setReload(false);
            } catch (error) {
              toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
              cookies.remove("accessToken");
              cookies.remove("refreshToken");
              setTimeout(() => {
                navigate("/login");
              }, 2500);
            }
          } else {
            toastError("เกิดข้อผิดพลาด");
            setReload(false);
          }
        }
      });
  }, []);

  const changePagePagination = async (changePage: number) => {
    try {
      setPage(changePage);
      const result = await useAxios(
        `/party?limit=3&page=${changePage}`,
        "get",
        false,
        true
      );
      setInformationPaginate(result.data.data.information);
      setParties(result.data.data.parties);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            const result = await useAxios(
              `/party?limit=3&page=${changePage}`,
              "get",
              false,
              true
            );
            setInformationPaginate(result.data.data.information);
            setParties(result.data.data.parties);
          } catch (error) {
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          toastError("เกิดข้อผิดพลาด");
        }
      }
    }
  };

  const searchParty = async (ev: React.FormEvent<HTMLInputElement>) => {
    try {
      setSearch(ev.currentTarget.value);
      const result = await useAxios(
        `/party?limit=3&page=${page}&search=${ev.currentTarget.value}`,
        "get",
        false,
        true
      );
      setInformationPaginate(result.data.data.information);
      setParties(result.data.data.parties);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponse;
        if (data.message === "token expired") {
          try {
            await renewToken();
            const result = await useAxios(
              `/party?limit=3&page=${page}&search=${ev.currentTarget.value}`,
              "get",
              false,
              true
            );
            setInformationPaginate(result.data.data.information);
            setParties(result.data.data.parties);
          } catch (error) {
            toastError("ทำรายการไม่สำเร็จ เข้าสู่ระบบอีกครั้ง");
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
            setTimeout(() => {
              navigate("/login");
            }, 2500);
          }
        } else {
          toastError("เกิดข้อผิดพลาด");
        }
      }
    }
  };

  return (
    <React.Fragment>
      {reload ? <Reload /> : null}
      <main className="w-full">
        <div className="text-3xl text-center font-semibold">ค้นหาปาร์ตี้</div>

        <form className="max-w-4xl w-full mx-auto">
          <input
            type="text"
            placeholder="ใส่ชื่อปาร์ตี้ที่ต้องการ"
            className="w-full rounded-md mt-2 p-3 mb-1 text-lg text-gray-700 outline-none bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-1"
            value={search}
            onInput={searchParty}
          />
        </form>

        <div className="mt-4 p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {parties.map((party: PartyItem, index: number) => {
            return (
              <CardParty
                key={index}
                _id={party._id}
                name={party.name}
                limit={party.limit}
                category={party.category}
                duration={party.duration}
                place={party.place}
                countMember={party.countMember}
                owner={party.owner.email}
                canJoin={
                  !selector.ownerParty && !selector.memberParty ? true : false
                }
                setState={setState}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={
              informationPaginate?.currentPage
                ? informationPaginate?.currentPage
                : 1
            }
            totalPages={
              informationPaginate?.totalPages
                ? informationPaginate?.totalPages
                : 1
            }
            onPageChange={changePagePagination}
            showIcons
          />
        </div>
      </main>
    </React.Fragment>
  );
};

export default FindParty;
