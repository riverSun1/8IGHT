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
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!me) return;
      const profile = await axios.get<UserProfile | null>("/api/profile", {
        params: {
          userId: me.id,
        },
      });
      if (profile) {
        setUserProfile(profile.data);
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

  const handleSave = async () => {
    if (!userProfile || !me) return;

    const success = await axios.post("/api/profile", {
      profile: userProfile,
      userId: me.id,
    });
    if (success) {
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto w-96 py-8">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl text-center font-bold mb-4">나의 프로필</h2>
        <UserProfileImage
          imageUrl={userProfile.imageUrl}
          isEditing={isEditing}
          onImageChange={handleImageChange}
        />
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">
            이름
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.nickname}
              onChange={(e) =>
                setUserProfile({ ...userProfile, nickname: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-gray-700 border-b-2">
              {userProfile.nickname}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">
            직군
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.position}
              onChange={(e) =>
                setUserProfile({ ...userProfile, position: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-gray-700 border-b-2">
              {userProfile.position}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">
            직무
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.job}
              onChange={(e) =>
                setUserProfile({ ...userProfile, job: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-gray-700 border-b-2">
              {userProfile.job}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">
            경력
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.career}
              onChange={(e) =>
                setUserProfile({ ...userProfile, career: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p className="text-lg text-gray-700 border-b-2">
              {userProfile.career}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              저장
            </button>
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
