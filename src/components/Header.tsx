"use client";

import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow border-b border-gray-300">
      <div className="flex items-center space-x-4">        
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-700 text-sm font-semibold leading-6 cursor-pointer">채용</a>
          <a href="#" className="text-gray-700 text-sm font-semibold leading-6 cursor-pointer">커리어</a>
          <a href="#" className="text-gray-700 text-sm font-semibold leading-6 cursor-pointer">소셜</a>
          <a href="#" className="text-gray-700 text-sm font-semibold leading-6 cursor-pointer">이력서</a>
        </nav>
      </div>
      <div>
        <button className="border px-4 py-2 rounded-md text-blue-600 border-blue-600 text-sm font-semibold leading-6 cursor-pointer h-8">
          회원가입/로그인
        </button>
      </div>
    </header>
  );
};

export default Header;
