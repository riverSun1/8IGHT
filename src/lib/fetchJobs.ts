import axios from "axios";

export async function fetchJobs(pageParam: number | unknown = 1) {
  const response = await axios.get(
    `http://localhost:3000/api/jobs?page=${pageParam}`
  );
  return response.data;
}
