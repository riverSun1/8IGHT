import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET: (request: NextRequest) => Promise<NextResponse> = async (
  request
) => {
  const supabase = createClient();
  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("email", email);

  if (error) {
    return NextResponse.json(error);
  }
  return NextResponse.json(data);
};
