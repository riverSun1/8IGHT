"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/contexts/auth.context";
import AuthButton from "../_components/Button";
import AuthInput from "../_components/Input";

function LoginPage() {
  const { logIn } = useAuth();
  const logInRouter = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(true);

  const isAllOkay =
    !emailError && !passwordError && email !== "" && password !== ""
      ? true
      : false;

  const handleClickLogIn = async () => {
    if (!isAllOkay) {
      return;
    }
    const response = await logIn(email, password);
    if (response.status) {
      return logInRouter.replace("/");
    }
  };

  return (
    <>
      <h1 className="mb-12 font-bold text-[28px] text-center text-neutral-950">
        이메일로 로그인
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
          className="text-[18px] font-medium h-[50px] bg-white flex items-center justify-center w-full text-blue-600 rounded-[10px] border border-neutral-300"
          href="/sign-up"
        >
          이메일로 회원가입
        </Link>
      </div>
    </>
  );
}

export default LoginPage;
