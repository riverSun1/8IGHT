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
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        }
        return undefined;
      },
    });

  const jobsData = data?.pages.flatMap((page) => page.data) ?? [];

  return { jobsData, fetchNextPage, hasNextPage, isFetching, error };
};
