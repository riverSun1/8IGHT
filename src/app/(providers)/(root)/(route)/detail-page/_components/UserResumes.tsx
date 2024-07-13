"use client";

import { useAuth } from "@/contexts/auth.context";
import { useCostumModal } from "@/contexts/modal.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserResumes = () => {
  const { me } = useAuth();
  const { handleOpen } = useCostumModal();
  const router = useRouter();
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [userResumes, setUserResumes] = useState<any[]>([]);

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
        return response.data;
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (files && resumes) {
      setUserResumes([...files, ...resumes]);
    }
  }, [files, resumes]);

  console.log("userResumes", userResumes);

  const retouchResume = () => {
    handleOpen({
      title: "이력서 수정",
      description: "이력서 수정하겠습니까?",
      handleconfirmButtonClick: () => {
        router.push("/resume");
      },
    });
  };

  return (
    <div>
      {userResumes?.map((resume: any) => {
        if (!resume) {
          return;
        }
        return (
          <div
            key={resume.id}
            className="flex justify-start items-center border rounded-xl py-4 px-3 gap-3 mt-3  relative"
          >
            <input type="radio" name="resumeCheckbox" />
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
    </div>
  );
};

export default UserResumes;
