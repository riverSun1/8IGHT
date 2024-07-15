import Image from "next/image";

import defaultImageUrl from "../../../public/assets/images/profile-placeholder2.png";

interface UserProfileImageProps {
  imageUrl: string;
  isEditing: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserProfileImage({
  imageUrl,
  isEditing,
  onImageChange,
}: UserProfileImageProps) {
  return (
    <div className="flex justify-center items-center mb-6 relative">
      <div className="relative w-40 h-40 items-center">
        <Image

          src={imageUrl || "public/assets/images/profile-placeholder2.png"}



          width={40}
          height={40}
          objectFit="cover"
          alt="Profile"
          className="rounded-full w-40 h-40"
        />
        {isEditing && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 rounded-full flex items-center justify-center hover:opacity-50">
              <span className="text-white text-sm">사진 편집</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}
