import axios from "axios";

export async function fetchJobs(
  pageParam: number | unknown = 1,
  job?: string,
  edu?: string,
  location?: string
) {
  const response = await axios.get(
    `http://localhost:3000/api/jobs?page=${pageParam}&job=${job}&edu=${edu}&location=${location}`
  );

  return response.data;
}
