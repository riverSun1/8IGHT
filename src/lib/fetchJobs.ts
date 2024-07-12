import axios from "axios";

export async function fetchJobs(pageParam: number | unknown = 1) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/jobs?page=${pageParam}`
  );
  return response.data;
}
