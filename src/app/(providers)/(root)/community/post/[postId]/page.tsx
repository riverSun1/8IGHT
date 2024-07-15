import axios from "axios";
import UserDataHeader from "./_components/UserDataHeader";

import Image from "next/image";
import { Tables } from "../../../../../../../types/supabase";

async function CommunityDetailPage({ params }: { params: { postId: string } }) {
  const post: Tables<"community_post"> = (
    await axios.get(`http://localhost:3000/api/community/post/${params.postId}`)
  ).data;
  return (
    <main className="w-full max-w-[500px] mx-auto">
      <header>
        <UserDataHeader />
        <p>{post.created_at}</p>
      </header>
      {post.imageUrl && (
        <div className="">
          <Image src={post.imageUrl ? post.imageUrl : ""} alt="게시글 이미지" />
        </div>
      )}
      <p>{post.comment}</p>
    </main>
  );
}

export default CommunityDetailPage;
