"use client";

import DropDown, { DropDownData } from "@/app/(providers)/_components/DropDown";
import BarsSvg from "@/app/(providers)/_components/icons/BarsSvg";
import { useAuth } from "@/contexts/auth.context";
import { useLoading } from "@/contexts/loading.context";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "../../../public/main_logo.png";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Header = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openLoading, closeLoading } = useLoading();

  const dropdownDatas: DropDownData[] = [
    {
      isLink: true,
      text: "소셜",
      href: "/community",
    },
    {
      isLink: true,
      text: "이력서",
      href: "/resume",
    },
    ...(isLoggedIn
      ? [
          {
            isLink: true,
            text: "마이 페이지",
            href: "/profile",
          },
          {
            isLink: false,
            text: "로그아웃",
            onClickFunc: () => handleClickLogOut(),
          },
        ]
      : [
          {
            isLink: true,
            text: "회원가입",
            href: "/sign-up",
          },
          {
            isLink: true,
            text: "로그인",
            href: "/log-in",
          },
        ]),
  ];

  const handleClickLogOut = async () => {
    openLoading();
    await logOut();
    closeLoading();
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); // 강제적인 1초 딜레이 추가
    };

    router.prefetch(pathname);

    handleRouteChange(); // 초기 로딩 상태 설정

    return () => {
      setLoading(false);
    };
  }, [pathname, router]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      closeLoading();
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <header className="border-b border-gray-300">
        <div className="container mx-auto max-w-[1400px] px-5 h-16 flex items-center">
          <Link href="/" className="text-lg font-bold">
            <Image src={logo} alt="logo" width={120} height={80} />
          </Link>
          <div
            className="relative ml-auto cursor-pointer min-[552px]:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <BarsSvg width={22} height={22} color="#676767" />
            <DropDown
              datas={dropdownDatas}
              isOpen={isOpen}
              DropDownref={dropdownRef}
            />
          </div>
          <div className="max-[550px]:hidden flex flex-row gap-5 mx-8">
            <div className="text-black font-bold hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              <Link href="/community">소셜</Link>
            </div>
            <div className="text-black font-bold hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              <Link href="/resume">이력서</Link>
            </div>
          </div>
          <div className="max-[550px]:hidden flex flex-row gap-3 ml-auto">
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
                  <Link href="/sign-up" onClick={() => openLoading()}>
                    회원가입
                  </Link>
                </div>
                <div className="border p-2 border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                  <Link href="/log-in" onClick={() => openLoading()}>
                    로그인
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
