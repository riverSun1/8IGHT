import { createClient } from "@/supabase/client";
const supabase = createClient();

interface UserProfile {
  nickname: string;
  imageUrl: string;
  position: string;
  job: string;
  career: string;
}

export const fetchUserProfile = async (userId: string) => {
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("nickname, imageUrl, position, job, career")
    .eq("id", userId!)
    .single();

<<<<<<< HEAD
=======
  const profile = response.data;
  const profileError = response.error;
>>>>>>> 41f83c357c107855cb508bf573c3ca65a2544521
  if (profileError) {
    console.error(profileError);
    return null;
  }

  return profile;
};

export const updateUserProfile = async (
  userId: string,
  profile: UserProfile
) => {
  const { error } = await supabase
    .from("users")
    .update(profile)
    .eq("id", userId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};
