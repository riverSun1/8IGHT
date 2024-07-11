import { createClient } from "@/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";
const supabase = createClient();

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

export const getUser: (userEamil: string) => Promise<any[] | null> = async (
  userEamil: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEamil);
  if (error) {
    console.log("supabaseUser", error);
  }
  return data;
};

export const getUserFile: (userEamil: string) => Promise<any[] | null> = async (
  userEamil: string
) => {
  const { data, error } = await supabase
    .from("file_uploads")
    .select("*")
    .eq("email", userEamil);
  if (error) {
    console.log("supabaseUser", error);
  }
  return data;
};
