import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export type UserProfile = {
  nickname: string;
  imageUrl: string;
  position: string;
  job: string;
  career: string;
};
interface ErrorResponse {
  error: string;
}

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const supabase = createClient();
  const userId = request.nextUrl.searchParams.get("userId");
  const response = await supabase
    .from("users")
    .select("nickname, imageUrl, position, job, career")
    .eq("id", userId!)
    .single();

  const profile = response.data;
  const profileError = response.error;
  if (profileError) {
    return NextResponse.json(null);
  }

  return NextResponse.json(profile);
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  // userId: string, profile: UserProfile
  const supabase = createClient();
  const data = await request.json();
  const profile = data.profile;
  const userId = data.userId;

  const { error } = await supabase
    .from("users")
    .update(profile)
    .eq("id", userId);

  if (error) {
    console.error(error);
    return NextResponse.json(false);
  }

  return NextResponse.json(true);
};
