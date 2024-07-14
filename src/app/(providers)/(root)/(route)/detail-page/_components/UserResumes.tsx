"use client";

import { useCostumModal } from "@/contexts/modal.context";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { ResumesType } from "./ApplyButton";

const UserResumes = ({
  userResumes,
  checkbox,
  setCheckbox,
}: {
  userResumes: ResumesType[];
  checkbox: string | null;
  setCheckbox: any;
}) => {
  const { handleOpen } = useCostumModal();
  const router = useRouter();

  //이력서 수정 버튼 모달창
  const retouchResume = () => {
    handleOpen({
      title: "이력서 수정",
      description: "이력서 수정하겠습니까?",
      handleconfirmButtonClick: () => {
        router.push("/resume");
      },
    });
  };

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckbox(e.target.value);
  };

  return (
    <>
      {userResumes?.map((resume: any) => {
        if (!resume) {
          return;
        }
        return (
          <div
            key={resume.id}
            className="flex justify-start items-center border rounded-xl py-4 px-3 gap-3 mt-3  relative "
          >
            <input
              type="radio"
              name="resumeCheckbox"
              value={resume.id}
              checked={checkbox === resume.id}
              onChange={check}
            />
            <div className="flex flex-col gap-2 ">
              <p className="text-sm/[13px] font-semibold">
                {resume.title ? resume.title : resume.file_name}
              </p>
              <button
                className=" absolute right-0 pr-4 pt-2 text-xs"
                onClick={retouchResume}
              >
                수정
              </button>

              <div className="flex justify-start items-center">
                <p className="text-xs/[8px]">
                  {resume.created_at.substr(0, 10).replace(/-/g, ".")}
                </p>

                <span className="text-xs px-1"> | </span>
                {resume.title ? (
                  <p className="text-xs/[8px]">이력서</p>
                ) : (
                  <p className="text-xs/[8px]">파일</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserResumes;
