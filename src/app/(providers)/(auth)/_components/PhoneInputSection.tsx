"use client";

import { CodeGlobalObj } from "@/app/api/auth/code-global/route";
import axios from "axios";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowDownSvg from "./icons/ArrowDownSvg";

// 인증번호를 입력해주세요.
// 올바르지 않은 인증번호입니다. 인증번호를 확인해주세요.
// 유효시간 01:07
// 인증 시간이 만료되었습니다. 다시 시도해 주세요.

const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const DEFAULT_TIME = 300;

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `0${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

function PhoneInputSection() {
  const [selects, setSelects] = useState<CodeGlobalObj[] | null>(null);
  const [initial, setInitial] = useState<boolean>(false);
  const [timeOut, setTimeOut] = useState<boolean>(true);
  const [phoneNum, setPhonNum] = useState<string>("");
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [randomNum, setRandomNum] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangePhoneNum: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhonNum(e.target.value);
    setIsPhone(false);
    if (regPhone.test(e.target.value)) {
      setIsPhone(true);
    }
  };
  const handleClickGetAccessNum: MouseEventHandler<HTMLButtonElement> = () => {
    setInitial(true);
    setTimeOut(false);
    const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
    setRandomNum(`${randomFourDigitNumber}`);
    alert(`번호 : ${randomFourDigitNumber}`);

    setTimeLeft(DEFAULT_TIME);

    timeRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  const handleClickAccessCodeCheck: MouseEventHandler<
    HTMLParagraphElement
  > = () => {
    if (randomNum === accessCode) {
      setIsSuccess(true);
      alert(`성공`);
    } else {
      setIsSuccess(false);
      alert(`실패`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CodeGlobalObj[]>(
          "/api/auth/code-global"
        );
        setSelects(response.data);
      } catch (error) {
        setSelects(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft < 0 && timeRef.current) {
      setTimeOut(true);
      return clearInterval(timeRef.current);
    }
  }, [timeLeft]);

  return (
    <div className="">
      <label className=" text-neutral-500">휴대폰 번호</label>
      <div className="flex flex-col gap-[8px]">
        <div className="relative w-full">
          <select className="focus:border-blue-600 w-full appearance-none select-no-expand cursor-pointer text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none  placeholder:font-normal placeholder:text-neutral-300">
            <option selected>South Korea +82</option>
            {selects &&
              selects.map((select) => (
                <option key={select["ISO numeric"]}>
                  {`${select.영문명} +${select["ISO numeric"]}`}
                </option>
              ))}
          </select>
          <div className="absolute w-[16px] h-[16px] right-[18px] top-[18px]">
            <ArrowDownSvg width={16} height={16} />
          </div>
        </div>
        <div className="flex w-full gap-2">
          <input
            className="flex-1 text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none  placeholder:font-normal placeholder:text-neutral-300"
            type="text"
            placeholder="(예시) 01013245768"
            value={phoneNum}
            onChange={handleChangePhoneNum}
          />
          {!initial ? (
            <button
              onClick={handleClickGetAccessNum}
              disabled={!isPhone}
              className={`${
                isPhone
                  ? "border border-neutral-300 bg-white text-blue-600 font-semibold text-[17px]"
                  : "bg-[#f4f4fe] text-[#d9d9d9]"
              } w-[120px] rounded-[10px] `}
            >
              인증번호 받기
            </button>
          ) : (
            <button
              onClick={handleClickGetAccessNum}
              className={`${
                timeOut
                  ? "bg-[#f4f4fe] text-[#d9d9d9]"
                  : "bg-white text-blue-600 border border-neutral-300"
              } w-[120px] rounded-[10px] `}
            >
              인증번호 재전송
            </button>
          )}
        </div>
        <div className="w-full relative">
          <input
            disabled={timeOut}
            className={`${
              !initial ? "bg-[#f4f4f4]" : "bg-white"
            } focus:border-blue-600 w-full bg-[#f4f4f4] text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none placeholder:font-normal placeholder:text-neutral-300`}
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          {!timeOut && accessCode !== "" && (
            <p
              onClick={handleClickAccessCodeCheck}
              className="cursor-pointer absolute text-blue-600 text-[17px] font-medium top-[12px] right-[15px]"
            >
              인증하기
            </p>
          )}
        </div>
        {initial && !isSuccess && (
          <div className="text-[13px]">
            <p className={`${timeOut ? "text-red-500" : ""}`}>
              {timeOut
                ? "인증 시간이 만료되었습니다. 다시 시도해 주세요."
                : "인증번호를 입력해주세요."}
            </p>
            <p className={`${timeOut ? "text-red-500" : ""}`}>
              유효시간 {formatTime(timeLeft)}
            </p>
          </div>
        )}
        {isSuccess && (
          <p className="text-[13px] text-green-500">인증에 성공했습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PhoneInputSection;
