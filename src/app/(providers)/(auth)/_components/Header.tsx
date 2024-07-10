"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center space-x-4">
        <Image
          src="/wanted-logo.png"
          alt="Logo"
          className="h-10"
          width={100}
          height={50}
        />
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            채용
          </a>
          <Link href="/sns" className="text-gray-700 hover:text-blue-500">
            소셜
          </Link>
          <Link href="/resume" className="text-gray-700 hover:text-blue-500">
            이력서
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-blue-500">마이페이지</button>
      </div>
    </header>
  );
};

export default Header;
