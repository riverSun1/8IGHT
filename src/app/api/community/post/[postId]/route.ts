import { createClient } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { postId: string } }
) => {
  console.log("1");
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("community_post")
      .select()
      .eq("id", params.postId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 401 }
    );
  }
};
