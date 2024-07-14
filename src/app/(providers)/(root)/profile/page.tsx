"use client";

import UserProfileImage from "@/components/UserProfile/UserProfileImage";
import { useAuth } from "@/contexts/auth.context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  nickname: string;
  imageUrl: string;
  position: string;
  job: string;
  career: string;
}

export default function ProfilePage() {
  const { isLoggedIn, me } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [initialProfile, setInitialProfile] = useState<UserProfile | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!me) return;
      const response = await axios.get<UserProfile | null>("/api/profile", {
        params: {
          userId: me.id,
        },
      });
      if (response.data) {
        setUserProfile(response.data);
        setInitialProfile(response.data); // 초기 상태 설정
      }
    };

    fetchProfile();
  }, [me, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/log-in");
    }
  }, [isLoggedIn, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (initialProfile) {
      setUserProfile(initialProfile); // 초기 상태로 되돌림
    }
  };

  const handleSave = async () => {
    if (!userProfile || !me) return;

    const success = await axios.post("/api/profile", {
      profile: userProfile,
      userId: me.id,
    });
    if (success) {
      setInitialProfile(userProfile); // 저장 후 초기 상태 업데이트
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserProfile({
          ...userProfile,
          imageUrl: reader.result as string,
        } as UserProfile);
      };
    }
  };

  const handleUseDefaultImage = () => {
    // 임의로 설정한 기본 이미지 URL
    const defaultImageUrl = "/images/profile-placeholder2.png";
    setUserProfile({
      ...userProfile,
      imageUrl: defaultImageUrl as string,
    } as UserProfile);
  };

  if (!userProfile) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-12">나의 프로필</h2>
        <div className="mb-4">
          <UserProfileImage
            imageUrl={userProfile.imageUrl}
            isEditing={isEditing}
            onImageChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          {isEditing ? (
            <button
              onClick={handleUseDefaultImage}
              className="text-sm text-gray-700 hover:underline focus:outline-none"
            >
              기본 이미지로 변경하기
            </button>
          ) : null}
        </div>
        <div className="mb-8">
          <label className="block text-left text-gray-500 text-sm font-bold mb-2">
            이름
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="이름을 입력하세요."
              value={userProfile.nickname}
              onChange={(e) =>
                setUserProfile({ ...userProfile, nickname: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-left text-gray-700 border-b-2">
              {userProfile.nickname}
            </p>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-left text-gray-500 text-sm font-bold mb-2">
            직군
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="직군을 입력하세요."
              value={userProfile.position}
              onChange={(e) =>
                setUserProfile({ ...userProfile, position: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-left text-gray-700 border-b-2">
              {userProfile.position}
            </p>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-left text-gray-500 text-sm font-bold mb-2">
            직무
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="직무를 입력하세요."
              value={userProfile.job}
              onChange={(e) =>
                setUserProfile({ ...userProfile, job: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-left text-gray-700 border-b-2">
              {userProfile.job}
            </p>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-left text-gray-500 text-sm font-bold mb-2">
            경력
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="경력을 입력하세요. ex)신입/경력"
              value={userProfile.career}
              onChange={(e) =>
                setUserProfile({ ...userProfile, career: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-left text-gray-700 border-b-2">
              {userProfile.career}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                취소
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              편집
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
