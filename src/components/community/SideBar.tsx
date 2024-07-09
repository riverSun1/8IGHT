"use client";

import React from 'react';

const SideBar = ({}) => {
  return (
    <aside className="w-1/4 p-4 bg-white h-screen border-r border-gray-300 sticky top-0">
      <div className="flex flex-col items-center py-4 border-b border-gray-300">
        <img src="/images/profile-placeholder.png" alt="프로필" className="w-16 h-16 rounded-full mb-2" />
        <h2 className="text-sm font-semibold">로그인 해주세요.</h2>
      </div>         
    </aside>
  );
};

export default SideBar;
