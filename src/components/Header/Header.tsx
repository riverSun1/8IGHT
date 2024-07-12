import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/wanted_logo.jpg";

const Header = () => {
  return (
    <header className="border-b border-gray-300">
      <div className="container mx-auto max-w-[1400px] px-5 h-16 flex items-center">
        <Link href="/" className="text-lg font-bold">
          <Image src={logo} alt="logo" width={150} height={90} />
        </Link>
        <div className="flex flex-row gap-3 ml-auto">
          <div className=" p-2 rounded-md text-blue-500 font-bold">
            <Link href="/profile">마이 페이지</Link>
          </div>
          <div className="border-2 p-2 border-gray-300 rounded-md text-blue-500 font-bold">
            <Link href="/sign-up">회원가입</Link>
          </div>
          <div className="border-2 p-2 border-gray-300 rounded-md text-blue-500 font-bold">
            <Link href="/log-in">로그인</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
