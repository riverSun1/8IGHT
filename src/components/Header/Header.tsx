"use client";

import { useAuth } from "@/contexts/auth.context";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/wanted_logo.jpg";

const Header = () => {
  const { me, isLoggedIn, logOut } = useAuth();
  const handleClickLogOut = async () => {
    logOut();
  };

  return (
    <header className="border-b border-gray-300">
      <div className="container mx-auto max-w-[1400px] px-5 h-16 flex items-center">
        <Link href="/" className="text-lg font-bold">
          <Image src={logo} alt="logo" width={150} height={90} />
        </Link>
        <div className="flex flex-row gap-3 mx-2">
          <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
            <Link href="/community">소셜</Link>
          </div>
          <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
            <Link href="/resume">이력서</Link>
          </div>
        </div>
        <div className="flex flex-row gap-3 ml-auto">
          {isLoggedIn ? (
            <>
              <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <Link href="/profile">마이 페이지</Link>
              </div>
              <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <button onClick={handleClickLogOut}>로그아웃</button>
              </div>
            </>
          ) : (
            <>
              <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <Link href="/sign-up">회원가입</Link>
              </div>
              <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <Link href="/log-in">로그인</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
