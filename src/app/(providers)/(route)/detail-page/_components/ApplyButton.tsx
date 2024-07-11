"use client";

import { getUser, getUserFile } from "@/app/api/detail-page/[id]/route";
import { useAuth } from "@/contexts/auth.context";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

const ApplyButton = () => {
  const { me } = useAuth();
  const [apply, setApply] = useState(false);
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await getUser(me?.email);
        setUser(data);
        return response;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const { data: file } = useQuery({
    queryKey: ["userFile"],
    queryFn: async () => {
      try {
        const response = await getUserFile(me?.email);
        setFiles(file);
        return response;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  console.log("file", files);
  console.log("me", me);

  console.log("userData", user);

  const clickHandler = () => {
    setApply(!apply);
  };

  return (
    <>
      {apply ? (
        <button
          className=" text-white w-80 py-3 flex justify-center items-center bg-blue-500 rounded-lg"
          onClick={clickHandler}
        >
          지원하기
        </button>
      ) : (
        <div className="w-80 border rounded-lg">
          <div className=" border-b py-3">
            <button onClick={clickHandler} className=" absolute pl-4">
              «
            </button>
            <h2 className=" text-center">지원하기</h2>
          </div>
          <div className="p-3 min-h-[300px] max-h-[560px] overflow-y-auto ">
            <h2 className="font-semibold text-lg">지원 정보</h2>
            <div className="py-3 border-b">
              <label
                form="name"
                className=" text-xs text-slate-400 pr-6 tracking-widest"
              >
                이 름
              </label>
              <input
                type="text"
                name="name"
                id="name"
                ref={nameRef}
                className="focus:outline-none"
              />
            </div>
            <div className=" flex justify-start items-center py-3 border-b">
              <p className=" text-xs text-slate-400 pr-6">이메일</p>
              <p>{!user ? null : user[0]?.email}</p>
            </div>
            <div className="py-3 border-b">
              <label form="name" className=" text-xs text-slate-400 pr-6">
                연락처
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:outline-none"
                ref={phoneRef}
              />
            </div>
            <h2 className="font-semibold text-lg pt-4">첨부파일 선택</h2>
            <div className="py-4">
              <button className="w-full border rounded-lg py-2 text-blue-500 text-sm">
                새 이력서 작성하기
              </button>
            </div>
            <h4 className="text-sm font-semibold text-slate-500 mb-2">
              지원 안내
            </h4>
            <ul className="flex flex-col text-xs gap-[6px] text-slate-500 list-disc pl-4 ">
              <li>
                이력서로 지원하면
                <span className="font-semibold">서류 합격률이 2배</span>
                높아집니다.
              </li>
              <li>제출한 서류는 다음 기간 동안 기업에게 제공됩니다.</li>
              <li>최종 합격 시 : 입사일 기준 90일 까지</li>
              <li>불합격 시 : 채용 전형 종료 즉시 열람 불가</li>
              <li>
                버튼 클릭 시 서류 제출에 대한 동의로 간주됩니다. 동의하지 않을
                경우 입사 지원이 불가합니다.
              </li>
            </ul>
          </div>
          <div className="p-4 border-t">
            <button className="w-full border rounded-lg py-2 ">제출하기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyButton;
