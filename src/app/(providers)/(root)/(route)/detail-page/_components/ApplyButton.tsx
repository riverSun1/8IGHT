"use client";

import { useAuth } from "@/contexts/auth.context";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import UserResumes from "./UserResumes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "@mui/material";
import { Tables } from "../../../../../../../types/supabase";
import { useCostumModal } from "@/contexts/modal.context";
import { useRouter } from "next/navigation";

export type ApplyButtonProps = {
  email: string;
};

export type ResumesType = Tables<"resumes"> & {
  product: Tables<"file_uploads">;
};

const ApplyButton = () => {
  const [apply, setApply] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userResumes, setUserResumes] = useState<ResumesType[]>([]);
  const [alertText, setAlertText] = useState<string>("");
  const [checkbox, setCheckbox] = useState<string | null>("");
  const { handleOpen } = useCostumModal();
  const router = useRouter();
  const { me } = useAuth();

  //supabase 파일형태 이력서 가져오기
  const { data: files, error: filesError } = useQuery({
    queryKey: ["userFile"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/detail-page/file", {
          params: {
            email: me?.email,
          },
        });
        return response.data;
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  //supabase 작성한 이력서 가져오기
  const { data: resumes, error: resumesError } = useQuery({
    queryKey: ["userResumes"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/detail-page/resumes", {
          params: {
            email: me?.email,
          },
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (files && resumes) {
      setUserResumes([...files, ...resumes]);
    }
  }, [files, resumes]);

  // 지원하기 버튼 클릭 시 로그인 확인
  const clickHandler = () => {
    if (!me) {
      alert("로그인해주세요");
      return;
    } else {
      setApply(!apply);
    }
  };

  //이름
  const userName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  //연락처
  const phoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  //Alert창 시간
  const alertTime = () => {
    setTimeout(() => {
      setAlertText("");
    }, 3000);
  };

  // 제출하기 버튼 클릭 이벤트
  const ApplyHandle = () => {
    //이름 작성 유효성 검사
    if (!name) {
      setAlertText("이름을 입력해주세요");
      alertTime();
      return;
    }
    // 연락처 유효성 검사
    if (!phone) {
      setAlertText("연락처를 입력해주세요");
      alertTime();
      return;
    }
    //이력서 체크 유효성 검사
    if (!checkbox) {
      setAlertText("이력서 작성해 주세요");
      alertTime();
      return;
    }
    handleOpen({
      title: "이력서 제출",
      description: "이력서 제출하시겠습니까?",
      handleconfirmButtonClick: () => {
        alert("제출이 완료되었습니다.");
        router.push("/");
      },
    });
  };

  return (
    <>
      {alertText ? (
        <Alert
          variant="outlined"
          severity="warning"
          className=" absolute right-50% top-0 mt-2"
        >
          {alertText}
        </Alert>
      ) : null}
      {apply ? (
        <button
          className=" text-white w-80 py-3 flex justify-center items-center bg-blue-500 rounded-lg"
          onClick={clickHandler}
        >
          지원하기
        </button>
      ) : (
        <div className="w-80 border rounded-lg">
          <div className=" border-b py-4">
            <button onClick={clickHandler} className=" absolute pl-4">
              «
            </button>
            <h2 className=" text-center">지원하기</h2>
          </div>
          <div className="p-3 min-h-[300px] max-h-[560px] overflow-y-auto ">
            <h2 className="font-semibold text-lg">지원 정보</h2>
            <div className=" flex justify-start items-center py-3 border-b">
              <label
                form="name"
                className=" text-xs text-slate-400 pr-4 tracking-widest"
              >
                이 름
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={userName}
                className="focus:outline-none text-sm w-8/12"
              />
            </div>
            <div className=" flex justify-start items-center py-3 border-b">
              <p className=" text-xs text-slate-400 pr-4">이메일</p>
              <p>{me?.email}</p>
            </div>
            <div className="flex justify-start items-center py-3 border-b">
              <label form="phon" className=" text-xs text-slate-400 pr-4  ">
                연락처
              </label>
              <input
                type="text"
                name="phon"
                id="phon"
                maxLength={11}
                className="focus:outline-none w-8/12 text-sm "
                placeholder="- 빼고 입력해주세요"
                onChange={phoneNumber}
              />
            </div>
            <h2 className="font-semibold text-lg pt-6">첨부파일 선택</h2>
            <UserResumes
              userResumes={userResumes}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
            />
            <div className="py-2 w-full  border rounded-lg my-3 text-center">
              <Link href={"/resume"} className=" py-2 text-blue-500 text-sm ">
                새 이력서 작성하기
              </Link>
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
            <button
              className="w-full border rounded-lg py-2 "
              onClick={ApplyHandle}
            >
              제출하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyButton;
