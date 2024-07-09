"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/contexts/auth.context";
import AuthInput from "../_components/Input";
import ArrowLeftSvg from "../_components/icons/ArrowLeftSvg";

function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickSignUp = async () => {
    signUp(email, password);
  };

  return (
    <>
      <button
        className="absolute top-0 left-8 flex gap-2 items-center"
        onClick={() => router.back()}
      >
        <ArrowLeftSvg color="#979798" width={20} height={20} />
        <p className="text-[18px] text-neutral-500">취소하고 돌아가기</p>
      </button>
      <h1 className="font-bold text-[28px] text-center text-neutral-950">
        회원가입
      </h1>
      <div className="flex flex-col gap-[30px]">
        <AuthInput
          placeholder="이메일을 입력해주세요."
          isEmail
          labelText="이메일"
          setInput={setEmail}
        />
        <div className="flex flex-col gap-[8px]">
          <AuthInput
            placeholder="비밀번호를 입력해주세요."
            isPassword
            labelText="비밀번호"
            setInput={setPassword}
          />
          <AuthInput
            placeholder="비밀번호를 다시 한번 입력해주세요."
            isPasswordCheck
            passwordNum={password}
          />
          <p className="text-neutral-400 text-[14px] font-[400]">
            영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자
            이하로 입력해주세요.
          </p>
        </div>
        <button className="mt-3 button" onClick={handleClickSignUp}>
          가입하기
        </button>
      </div>
    </>
  );
}

export default SignUpPage;
