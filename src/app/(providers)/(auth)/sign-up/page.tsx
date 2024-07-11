"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/contexts/auth.context";
import AuthButton from "../_components/Button";
import ArrowLeftSvg from "../_components/icons/ArrowLeftSvg";
import AuthInput from "../_components/Input";
import PhoneInputSection from "../_components/PhoneInputSection";
import SignUpTerms from "../_components/SignUpTerms";

export type handleCheckType = (successBoolean: boolean) => void;

function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPhoneCheckSuccess, setIsPhoneCheckSuccess] =
    useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isAllOkay =
    email && password && isPhoneCheckSuccess && isChecked ? true : false;

  const handleCheck: handleCheckType = (successBoolean) => {
    setIsPhoneCheckSuccess(successBoolean);
  };

  const handleClickSignUp = async () => {
    if (!isAllOkay) {
      return;
    }
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
      <h1 className="mb-12 font-bold text-[28px] text-center text-neutral-950">
        회원가입
      </h1>
      <div className="flex flex-col gap-[30px]">
        <AuthInput
          placeholder="이메일을 입력해주세요."
          isEmail
          labelText="이메일"
          setInput={setEmail}
        />
        <PhoneInputSection handleSuccess={handleCheck} />
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
        <SignUpTerms
          getCheckedConditionFunc={(boolean) => {
            setIsChecked(boolean);
          }}
        />
        <AuthButton onClick={handleClickSignUp} isAllOk={isAllOkay}>
          가입하기
        </AuthButton>
      </div>
    </>
  );
}

export default SignUpPage;
