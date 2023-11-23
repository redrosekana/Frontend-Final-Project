import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";

// hooks
import useAxios from "../../../../hooks/useAxios";

// redux
import type { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../store/hook";

// types
import { PartyItem } from "../types/FindPartyTypes";

// component
import CardParty from "./CardParty";

const FindParty = () => {
  const selector = useAppSelector((state: RootState) => state.users);
  const [parties, setParties] = useState<PartyItem[]>([]);
  const [informationPaginate, setInformationPaginate] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    useAxios("/party?limit=3&page=1", "get", false, true)
      .then((result) => {
        setInformationPaginate(result.data.data.information);
        setParties(result.data.data.parties);
      })
      .catch((error) => {
        console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-2xl text-center font-semibold">ค้นหาปาร์ตี้</div>

      <form className="p-2 max-w-3xl w-full mx-auto">
        <div className="p-1 flex items-center">
          <input
            type="text"
            placeholder="ใส่ชื่อปาร์ตี้ที่ต้องการ "
            className="mt-1 rounded focus:ring-1 text-lg flex-grow"
            value={search}
            onInput={searchParty}
          />
        </div>
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
    </div>
  );
};

export default FindParty;
