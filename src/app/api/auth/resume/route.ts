import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
    user_id,
    title,
    personalInfo,
    career,
    education,
    skills,
    awards,
    introduction,
    links,
  } = data;

  const supabase = createClient();
  const { data: resume, error } = await supabase.from("resumes").insert([
    {
      user_id,
      title,
      personal_info: personalInfo,
      career,
      education,
      skills,
      awards,
      introduction,
      links,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(resume);
}
