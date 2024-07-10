"use client";

import { useState } from "react";

// 인증번호를 입력해주세요.
// 올바르지 않은 인증번호입니다. 인증번호를 확인해주세요.
// 유효시간 01:07
// 인증 시간이 만료되었습니다. 다시 시도해 주세요.

function PhoneInputSection() {
  const [initial, setInitial] = useState<boolean>(false);
  const [nationalCode, setNationalConde] = useState();
  const [phoneNum, setPhonNum] = useState<number | "">("");
  const [accessCode, setAccessCode] = useState<number | "">("");
  return (
    <div className="">
      <label className=" text-neutral-500">휴대폰 번호</label>
      <div className="flex flex-col gap-[8px]">
        <input
          className="text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none  placeholder:font-normal placeholder:text-neutral-300"
          type="text"
        />
        <div>
          <input
            className="text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none  placeholder:font-normal placeholder:text-neutral-300"
            type="text"
            placeholder="(예시) 01013245768"
          />
          {!initial ? (
            <button>인증번호 받기</button>
          ) : (
            <button>인증번호 재전송</button>
          )}
        </div>
        <div>
          <input
            className="text-base px-4 h-[50px] rounded-[10px] border border-neutral-300 outline-none placeholder:font-normal placeholder:text-neutral-300"
            type="text"
            placeholder="인증번호를 입력해주세요."
          />
        </div>
        <p> </p>
      </div>
    </div>
  );
}

export default PhoneInputSection;
