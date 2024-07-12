"use client";

import { User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isInitailized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  logIn: (email: string, password: string) => Promise<{ status: number }>;
  logOut: () => void;
  signUp: (email: string, password: string) => Promise<{ status: number }>;
};

const initialValue: AuthContextValue = {
  isInitailized: false,
  isLoggedIn: false,
  me: null,
  logIn: async () => ({ status: 0 }),
  logOut: () => {},
  signUp: async () => ({ status: 0 }),
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isInitailized, setIsInitailized] =
    useState<AuthContextValue["isInitailized"]>(false);
  const [me, setMe] = useState<AuthContextValue["me"]>(null);
  const isLoggedIn = !!me;

  // 로그인 함수
  const logIn: AuthContextValue["logIn"] = async (email, password) => {
    if (!email || !password) {
      return { status: 401, message: "이메일, 비밀번호 모두 채워 주세요!" };
    }
    const data = {
      email,
      password,
    };
    const response = await fetch("http://localhost:3000/api/auth/log-in", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const user = await response.json();
    setMe(user);

    if (response.status === 401) {
      return { status: 401, message: "로그인에 실패했습니다." };
    }
    return { status: 200 };
  };

  // 가입 함수
  const signUp: AuthContextValue["signUp"] = async (email, password) => {
    if (!email || !password) {
      return { status: 401, message: "이메일, 비밀번호 모두 채워 주세요." };
    }
    if (me) {
      alert("");
      return { status: 400, message: "이미 로그인이 되어있어요." };
    }
    const data = {
      email,
      password,
    };
    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const user = await response.json();
    setMe(user);

    if (response.status === 401) {
      return { status: 401, message: "회원가입에 실패했습니다." };
    }
    return { status: 200 };
  };

  // 로그아웃 함수
  const logOut: AuthContextValue["logOut"] = async () => {
    if (!me) return { status: 401, message: "로그인하고 눌러주세요." };
    await fetch("http://localhost:3000/api/auth/log-out", {
      method: "DELETE",
    });
    setMe(null);
  };

  const value = {
    isInitailized,
    isLoggedIn,
    me,
    logIn,
    logOut,
    signUp,
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me").then(async (response) => {
      if (response.status === 200) {
        const user = await response.json();
        setMe(user);
      }
    });
    setIsInitailized(true);
  }, []);

  if (!isInitailized) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
