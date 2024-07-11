"use client";

import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/contexts/auth.context";
import AuthButton from "../_components/Button";
import AuthInput from "../_components/Input";

function LoginPage() {
  const { logIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [emialError, setEmailError] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(true);

  const isAllOkay = !emialError && !passwordError ? true : false;

  const handleClickLogIn = async () => {
    if (!isAllOkay) {
      return;
    }
    logIn(email, password);
  };

  return (
    <>
      <h1 className="mb-12 font-bold text-[28px] text-center text-neutral-950">
        이메일 로그인
      </h1>
      <div className="flex flex-col gap-[30px]">
        <AuthInput
          setInput={setEmail}
          labelText="이메일"
          isEmail
          placeholder="이메일을 입력해주세요."
          getIsError={setEmailError}
        />
        <AuthInput
          setInput={setPassword}
          labelText="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요."
          getIsError={setPasswordError}
        />
        <div className="w-full mt-5">
          <AuthButton onClick={handleClickLogIn} isAllOk={isAllOkay}>
            가입하기
          </AuthButton>
        </div>
        <div className="relative py-4">
          <hr />
          <p className="text-[14px] text-neutral-400 px-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            또는
          </p>
        </div>
        <Link
          className="text-[18px] font-medium h-[48px] bg-white flex items-center justify-center w-full text-blue-600 rounded-[10px] border border-neutral-300"
          href="/sign-up"
        >
          이메일로 회원가입
        </Link>
      </div>
      <div></div>
    </>
    // <div className="max-w-96 flex flex-col">
    //   <input
    //     className="input"
    //     type="text"
    //     placeholder="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     className="input"
    //     type="text"
    //     placeholder="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button className="mt-3 button" onClick={handleClickLogIn}>
    //     로그인하기
    //   </button>
    // </div>
  );
}

export default LoginPage;
