import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import error from "../../../../public/assets/images/error.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-white text-blue-500 gap-5">
        <Image src={error} width={350} height={350} alt="error" />
        <h1 className="text-4xl font-bold my-4">PAGE NOT FOUND</h1>
        <div className="flex flex-col text-lg text-center gap-2 text-black">
          <p>요청하신 페이지가 존재하지 않습니다.</p>
          <p>
            <Link href="/" className="text-blue-500 underline m-0">
              Home
            </Link>
            으로 이동하시겠습니까?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
