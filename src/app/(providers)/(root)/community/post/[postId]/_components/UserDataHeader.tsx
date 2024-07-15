"use client";

import { useAuth } from "@/contexts/auth.context";
import Image from "next/image";

import Link from "next/link";
import defaultImage from "../../../../../../../../public/assets/images/profile-placeholder.png";

function UserDataHeader() {
  const { userData, isLoggedIn, me } = useAuth();
  return (
    <div className="flex gap-2 items-center">
      <Image
        className="rounded-full w-[50px] h-[49px]"
        width={50}
        height={50}
        src={userData?.imageUrl || defaultImage}
        alt="유저 이미지"
      />
      {isLoggedIn ? (
        userData?.nickname ? (
          <p>{userData?.nickname}</p>
        ) : (
          <p>{me?.email}</p>
        )
      ) : (
        <Link href="/log-in">로그인하기</Link>
      )}
    </div>
  );
}

export default UserDataHeader;
