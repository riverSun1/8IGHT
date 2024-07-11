"use client";

import { fetchJobs } from "@/lib/fetchJobs";
import { Jobs } from "@/types/jobs.types";
import { useInfiniteQuery } from "@tanstack/react-query";

type JobResponse = {
  data: Jobs[];
  hasNextPage: boolean;
};

export const useGetJobs = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, error } =
    useInfiniteQuery<JobResponse, Error>({
      queryKey: ["Job"],
      queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam),
      initialPageParam: 1,
      staleTime: 300000,

      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지에서 다음 페이지 번호를 계산할 로직
        if (lastPage.hasNextPage) {
          return allPages.length + 1; // 다음 페이지 번호
        }
        return undefined; // 더 이상 페이지가 없으면 undefined 반환
      },
    });

  const jobsData = data?.pages.flatMap((page) => page.data) ?? [];

  return { jobsData, fetchNextPage, hasNextPage, isFetching, error };
};
