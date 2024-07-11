"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from "@/contexts/auth.context";

const SideBar = () => {
  const { isLoggedIn, me, userData, logOut } = useAuth();

  const handleClickLogOut = async () => {
    logOut();
  };

  return (
    <aside className="w-1/4 p-4 bg-white border-r border-gray-300 h-screen">
      <div className="flex flex-col items-center py-4 border-b border-gray-300">
        <img
          src={userData?.imageUrl || "/images/profile-placeholder.png"}
          alt="프로필"
          className="w-16 h-16 rounded-full mb-2"
        />
        {isLoggedIn ? (
          <>
            <span className="text-sm font-semibold text-blue-500 mb-2">
              {userData?.nickname || me?.email}
            </span>
            <button onClick={handleClickLogOut} className="text-sm font-semibold text-blue-500">로그아웃</button>
          </>
        ) : (
          <Link href="/log-in">
            <h2 className="text-sm font-semibold text-blue-500 cursor-pointer">로그인 해주세요.</h2>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
