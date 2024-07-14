"use client";

import { fetchJobs } from "@/lib/fetchJobs";
import { Jobs } from "@/types/jobs.types";
import { useInfiniteQuery } from "@tanstack/react-query";

type JobResponse = {
  data: Jobs[];
  hasNextPage: boolean;
};

interface Params {
  job?: string;
  edu?: string;
  location?: string;
}

export const useGetJobs = ({ job, edu, location }: Params) => {
  const { data, fetchNextPage, hasNextPage, isFetching, error } =
    useInfiniteQuery<JobResponse, Error>({
      queryKey: ["Job", { job, edu, location }], // 옵션은 객체로, home이랑 key 다른거임.
      queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam, job, edu, location),
      initialPageParam: 1,
      staleTime: 300000,

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        }
        return undefined;
      },
    });

  const jobsData = data?.pages.flatMap((page) => page.data) ?? [];

  return { jobsData, fetchNextPage, hasNextPage, isFetching, error };
};
