"use client";

import { jobDetailType } from "@/types/jobDetailType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["detailDate"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/detail-page/${params.id}`);
        const data: jobDetailType = response.data;
        // console.log("데이터", data);
        return data;
      } catch (error) {
        // console.log("error", error);
      }
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const uniqueArray = data?.result.steps.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.sortNo === item.sortNo)
  );

  return (
    <div className="flex justify-center items-start p-10 gap-10 ">
      <div className=" w-6/12 h-auto">
        <div className=" flex flex-col justify-start border-b-[1px] my-1">
          <div className="flex justify-start items-center gap-1">
            <a
              href={data?.result.srcUrl}
              className="font-semibold text-lg underline underline-offset-2 text-slate-800"
            >
              {data?.result?.instNm}
            </a>
            <span className="font-semibold">∙</span>
            <p className="text-sm">{data?.result.workRgnNmLst}</p>
            <span className="font-semibold">∙</span>
            <p className="text-sm">{data?.result.recrutSeNm}</p>
          </div>
          <h1 className="font-bold text-2xl py-3">
            {data?.result?.recrutPbancTtl}
          </h1>
        </div>
        <div className="py-2 flex flex-col gap-2 border-b-[1px]">
          <h2 className="font-semibold text-base ">채용</h2>
          <div className="flex justify-start items-center gap-3 pb-2">
            <p className="border rounded-lg text-center p-2 text-xs">
              {data?.result.ncsCdNmLst}
            </p>
            <p className="border rounded-lg text-center p-2 text-xs">
              {data?.result.hireTypeNmLst}
            </p>
          </div>
          <h2 className="font-semibold text-base">부서</h2>
          <div className="flex justify-start items-center flex-wrap gap-3 pb-2">
            {uniqueArray?.map((step, index) => (
              <p
                key={index}
                className="border rounded-lg text-center p-2 text-xs"
              >
                {step.recrutPbancTtl}
              </p>
            ))}
          </div>
        </div>
        <h1 className="font-semibold py-5 text-xl">포지션 상세</h1>
        <div className=" flex flex-col gap-2 pb-4">
          {data?.result.scrnprcdrMthdExpln.split(/-|O/).map((detail, index) => (
            <div key={index}>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <h2 className="font-semibold text-lg">자격 요건</h2>
          <div className="flex gap-2">
            {data?.result?.acbgCondNmLst.split(",").map((education, index) => (
              <div key={index} className=" border p-1 rounded">
                <p className="text-sm">{education}</p>
              </div>
            ))}
          </div>
          {data?.result.aplyQlfcCn.split(/-|○/).map((common, index) => (
            <div key={index}>
              <p>{common}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 py-4">
          <h2 className="font-semibold text-lg">결격 사유</h2>
          <div className="flex flex-col gap-2">
            {data?.result.disqlfcRsn.split("○").map((recruit, index) => (
              <div key={index}>
                <p>{recruit}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-semibold text-lg">우대 사항</h2>
        <p>{data?.result.prefCn}</p>
        <div>{data?.result.nonatchRsn}</div>
        <div className="flex flex-col gap-2 py-4">
          <h2 className="font-semibold text-lg">첨부 파일</h2>
          <div className=" flex gap-4">
            {data?.result.files.map((file, index) => (
              <a key={index} href={file.url} className="text-sky-600">
                {file.atchFileNm}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-1/5 flex justify-center items-center bg-blue-500 rounded-lg">
        <button className="p-4 text-white">지원하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
