import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const ApiKey = process.env.API_JOB_KEY;
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/1051000/recruitment/detail?serviceKey=${ApiKey}${params.id}`
    );
    const data = response.data;
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
