"use client";

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import TeamList from './TeamList';

const SideBar = ({ handleOpen, teams }) => {
  return (
    <aside className="w-1/4 p-4 bg-white h-screen border-r border-gray-300 sticky top-0">
      <div className="flex flex-col items-center py-4 border-b border-gray-300">
        <img src="/images/profile-placeholder.png" alt="프로필" className="w-16 h-16 rounded-full mb-2" />
        <h2 className="text-sm font-semibold">로그인 해주세요.</h2>
      </div>
      <div className="py-4 border-b border-gray-300">
        <h3 className="text-sm font-semibold mb-2">나의 팀</h3>
        <div className="flex items-center cursor-pointer p-2 border rounded-lg" onClick={handleOpen}>
          <AddIcon className="text-gray-500" />
          <span className="ml-2 text-sm font-semibold text-gray-500">팀 생성</span>
        </div>
      </div>
      <div className="py-4 border-b border-gray-300">
        <TeamList teams={teams} />
      </div>
    </aside>
  );
};

export default SideBar;
