import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

const supabase = createClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { data, error } = await supabase.from("resumes").insert([formData]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
