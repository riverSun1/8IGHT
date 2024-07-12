"use client";

import { MouseEventHandler, useEffect, useState } from "react";

import ArrowRightSvg from "./icons/ArrowRightSvg";

function SignUpTerms({
  getCheckedConditionFunc,
}: {
  getCheckedConditionFunc: (boolean: boolean) => void;
}) {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [ageCheck, setAgeCheck] = useState<boolean>(false);
  const [useRuleCheck, setUseRuleCheck] = useState<boolean>(false);
  const [privateInfoCheck, setPrivateInfoCheck] = useState<boolean>(false);
  const [newsCheck, setNewsCheck] = useState<boolean>(false);
  const [customPosition, setCustomPosition] = useState<boolean>(false);

  const handleCheckAll: MouseEventHandler<HTMLInputElement> = () => {
    if (checkAll) {
      setCheckAll(false);
      getCheckedConditionFunc(false);

      setUseRuleCheck(false);
      setAgeCheck(false);
      setPrivateInfoCheck(false);
      setNewsCheck(false);
      setCustomPosition(false);
    } else {
      setCheckAll(true);
      getCheckedConditionFunc(true);

      setUseRuleCheck(true);
      setAgeCheck(true);
      setPrivateInfoCheck(true);
      setNewsCheck(true);
      setCustomPosition(true);
    }
  };

  useEffect(() => {
    if (
      ageCheck &&
      useRuleCheck &&
      privateInfoCheck &&
      newsCheck &&
      customPosition
    ) {
      return setCheckAll(true);
    } else {
      return setCheckAll(false);
    }
  }, [ageCheck, useRuleCheck, privateInfoCheck, newsCheck, customPosition]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="w-[18px] h-[18px]"
          onClick={handleCheckAll}
          checked={checkAll}
        />
        <p>전체 동의</p>
      </div>
      <hr className="" />
      <div className="text-neutral-400 flex flex-col gap-4">
        <div>
          <div className="flex gap-2 items-center">
            <input
              checked={ageCheck}
              type="checkbox"
              className="w-[18px] h-[18px] rounded-sm checked:"
              onClick={() => setAgeCheck(!ageCheck)}
            />
            <p>만 14세 이상입니다. (필수)</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input
              checked={useRuleCheck}
              type="checkbox"
              className="w-[18px] h-[18px]"
              onClick={() => setUseRuleCheck(!useRuleCheck)}
            />
            <p>원티드 이용약관 동의 (필수)</p>
          </div>
          <ArrowRightSvg />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input
              checked={privateInfoCheck}
              type="checkbox"
              className="w-[18px] h-[18px]"
              onClick={() => setPrivateInfoCheck(!privateInfoCheck)}
            />
            <p>원티드 개인정보 수집 및 이용 동의 (필수)</p>
          </div>
          <ArrowRightSvg />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <input
              checked={newsCheck}
              type="checkbox"
              className="w-[18px] h-[18px]"
              onClick={() => setNewsCheck(!newsCheck)}
            />
            <p>채용 소식, 커리어 콘텐츠, 이벤트 등 원티드 맞춤 정보 받긴</p>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <input
              checked={customPosition}
              type="checkbox"
              className="w-[18px] h-[18px]"
              onClick={() => setCustomPosition(!customPosition)}
            />
            <p>맞춤 추천 포지션 정보 받기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpTerms;
