import Carousel from "@/components/Carousel/Carousel";
import JobList from "@/components/JobList/JobList";
import { fetchJobs } from "@/lib/fetchJobs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Job"],
    queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam),
    initialPageParam: 1,
    staleTime: 300000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="container mx-auto max-w-[1200px] justify-center">
        <div className="flex justify-center m-4">
          <Carousel />
        </div>
        <JobList />
      </div>
    </HydrationBoundary>
  );
}
