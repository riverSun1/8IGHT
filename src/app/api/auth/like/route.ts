import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const data = await request.json();
    const { postId } = data;

    const { data: rpcData, error } = await supabase.rpc("increment_like", {
      post_id: postId,
    });

    if (error) {
      console.error("Error incrementing like count:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!rpcData || rpcData.length === 0) {
      throw new Error("No data returned from RPC");
    }

    return NextResponse.json(
      { newLikeCount: rpcData[0].new_like_count },
      { status: 200 }
    );
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
