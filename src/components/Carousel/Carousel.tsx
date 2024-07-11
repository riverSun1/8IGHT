"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import main1 from "../../../public/assets/images/main1.webp";
import main2 from "../../../public/assets/images/main2.webp";
import main3 from "../../../public/assets/images/main3.webp";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [main1, main2, main3];

  const extendedImages = [
    images[images.length - 1],
    ...images,
    ...images,
    images[0],
  ];

  // 다음 슬라이드로 자동으로 넘어가기 위한 interval 설정
  useEffect(() => {
    const interval = setInterval(goToNext, 3000); // 3초마다 다음 슬라이드로 넘김
    // 컴포넌트가 unmount 되거나 업데이트 될 때 interval 클리어
    return () => clearInterval(interval);
  }, [currentIndex]); // currentIndex가 변경될 때마다 interval 재설정

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === extendedImages.length - 1) {
        return 2;
      } else {
        return prevIndex + 1;
      }
    });
    setIsTransitioning(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(extendedImages.length - 3);
    } else if (currentIndex === extendedImages.length - 1) {
      setCurrentIndex(2);
    }
  };

  return (
    <div className="relative overflow-hidden justify-center">
      <div
        className={`flex transition-transform duration-500 ${
          isTransitioning ? "" : "duration-0"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className="min-w-full relative flex justify-center">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="responsive"
              width={1100}
              height={300}
              objectFit="cover"
              className="object-cover rounded-md max-w-[1200px] max-h-[210px]"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 px-3 p-1.5 rounded-full"
        onClick={goToPrevious}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-50 px-3 p-1.5 rounded-full"
        onClick={goToNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
