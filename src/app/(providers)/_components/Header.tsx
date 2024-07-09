"use client";

import { useAuth } from "@/contexts/auth.context";
import Link from "next/link";

function RootHeader() {
  const { me, isLoggedIn, logOut } = useAuth();
  const handleClickLogOut = async () => {
    logOut();
  };

  return (
    <div>
      <h1>{me && me.email}</h1>
      {isLoggedIn ? (
        <button className="button my-5" onClick={handleClickLogOut}>
          로그아웃
        </button>
      ) : (
        <>
          <Link href="/log-in" className="button">
            로그인
          </Link>
          <Link href="/sign-up" className="button">
            회원가입
          </Link>
        </>
      )}
    </div>
  );
}

export default RootHeader;
