"use client";

import {
  ChangeEventHandler,
  PropsWithChildren,
  useEffect,
  useId,
  useState,
} from "react";

import EyeCloseSvg from "./icons/EyeCloseSvg";
import EyeOpenSvg from "./icons/EyeOpenSvg";

// 정규표현식
const emialRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// const passwordRegex = new RegExp(
//   /([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)|([a-zA-Z]+[?.,;:|*~`!^-_+<>@#$%&='"]+)|([0-9]+[?.,;:|*~`!^-_+<>@#$%&='"]+)/g
// );
const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
);
type InputProps = {
  labelText?: string | null;
  placeholder: string;
  isPassword?: boolean;
  isEmail?: boolean;
  isPasswordCheck?: boolean;
  passwordNum?: string;
  setInput?: (value: string) => void;
};

function AuthInput({
  labelText = null,
  placeholder,
  isPassword = false,
  isEmail = false,
  isPasswordCheck = false,
  passwordNum = "",
  setInput,
}: PropsWithChildren<InputProps>) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [InputType, setButtonType] = useState<string>("text");
  const [isError, setIsError] = useState<boolean>(false);
  const [warningString, setWarningString] = useState<string>("");
  const id = useId();

  useEffect(() => {
    if (isPassword) {
      setButtonType("password");
      setWarningString("올바르지 않은 비밀번호입니다.");
    } else if (isEmail) {
      setButtonType("email");
      setWarningString("올바른 이메일을 입력해주세요.");
    } else if (isPasswordCheck) {
      setButtonType("password");
      setWarningString("비밀번호가 서로 일치하지 않습니다.");
    }
  }, [isPassword, isEmail, isPasswordCheck]);

  const handleChanage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsError(false);
    setInputValue(e.target.value);
    if (setInput) setInput(e.target.value);
    if (e.target.value === "") return;

    if (isPassword) {
      !passwordRegex.test(e.target.value) && setIsError(true);
    } else if (isEmail) {
      !emialRegex.test(e.target.value) && setIsError(true);
    } else if (isPasswordCheck) {
      passwordNum !== e.target.value && setIsError(true);
    }
  };
  const handleClick = () => {
    if (isChecked) {
      setIsChecked(false);
      setButtonType("password");
    } else {
      setIsChecked(true);
      setButtonType("text");
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {labelText && (
        <label className=" text-neutral-500" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type={InputType}
        id={id}
        value={inputValue}
        onChange={handleChanage}
        placeholder={placeholder}
        className={`${
          isError ? "border-red-500 focus:border-red-500" : ""
        } text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none focus:border-blue-600 placeholder:font-normal placeholder:text-neutral-300`}
      />
      {isError && (
        <p className="text-red-500 font-[400] text-[14px]">{warningString}</p>
      )}
      {isPassword && (
        <div
          className="absolute right-3 top-[46px] w-[26px] h-[24px] cursor-pointer"
          onClick={handleClick}
        >
          {isChecked ? (
            <EyeCloseSvg width={24} height={24} />
          ) : (
            <EyeOpenSvg width={24} height={24} />
          )}
        </div>
      )}
    </div>
  );
}

export default AuthInput;
