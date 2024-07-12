"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth.context";

const SideBar = () => {
  const { isLoggedIn, me, userData, logOut } = useAuth();

  const handleClickLogOut = async () => {
    logOut();
  };

  return (
    <aside className="w-1/4 p-6 bg-white border-r border-gray-300 h-screen flex flex-col items-center">
      <div className="flex flex-col items-center py-6 border-b border-gray-300">
        <img
          src={userData?.imageUrl || "/assets/images/profile-placeholder.png"}
          alt="프로필"
          className="w-24 h-24 rounded-full mb-4"
        />
        {isLoggedIn ? (
          <>
            <span className="text-lg font-semibold text-blue-500 mb-2">
              {userData?.nickname || me?.email}
            </span>
            <button
              onClick={handleClickLogOut}
              className="text-sm font-semibold text-blue-500"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link href="/log-in">
            <h2 className="text-lg font-semibold text-blue-500 cursor-pointer">
              로그인 해주세요.
            </h2>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
