import { createClient } from "@/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();
  try {
    const formData = await req.json();
    const { data, error } = await supabase.from("resumes").insert([formData]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const err = error as PostgrestError;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const supabase = createClient();
  try {
    const formData = await req.json();
    const { id, ...updateData } = formData;
    const { data, error } = await supabase
      .from("resumes")
      .update(updateData)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const err = error as PostgrestError;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
