"use client";

import { useId } from "react";

function PhoneInputSection() {
  const id = useId();
  return (
    <div className="">
      <label className=" text-neutral-500" htmlFor={id}>
        휴대폰 번호
      </label>
      <div className="flex flex-col gap-[8px]">
        <input type="text" name="" id="" />
        <div>
          <input type="text" name="" id="" />
        </div>
        <div>
          <input type="text" name="" id="" />
        </div>
        <p> </p>
      </div>
    </div>
  );
}

export default PhoneInputSection;
