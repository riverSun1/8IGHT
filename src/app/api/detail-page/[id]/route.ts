import { createClient } from "@/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";
const supabase = createClient();

// 상세페이지 API
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
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
