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
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};

// (현재 로그인 된 user Email === users테이블 email) 가져오기
export const getUser: (userEmail: string) => Promise<any[] | null> = async (
  userEmail: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail);
  if (error) {
    console.log("supabaseUser", error);
  }
  return data;
};

export const getUserFile: (userEmail: string) => Promise<any[] | null> = async (
  userEmail: string
) => {
  const { data, error } = await supabase
    .from("file_uploads")
    .select("*")
    .eq("email", userEmail);
  if (error) {
    console.log("supabaseUser", error);
  }
  return data;
};

export const getResumes: (userEmail: string) => Promise<any[] | null> = async (
  userEmail: string
) => {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("email", userEmail);
  if (error) {
    console.log("supabaseUser", error);
  }
  return data;
};
