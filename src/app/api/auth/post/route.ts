import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const data = await request.json();
    const { postContent, image, user_id } = data;

    const { data: insertedData, error } = await supabase
      .from("community-post")
      .insert([
        {
          comment: postContent,
          imageUrl: image,
          created_at: new Date(),
          user_id: user_id,
        },
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(insertedData, { status: 200 });
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
