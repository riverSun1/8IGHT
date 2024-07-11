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
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  signUp: (email: string, password: string) => void;
};

const initialValue: AuthContextValue = {
  isInitailized: false,
  isLoggedIn: false,
  me: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
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
    if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요!");
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
  };

  // 가입 함수
  const signUp: AuthContextValue["signUp"] = async (email, password) => {
    if (!email || !password) return alert("이메일, 비밀번호 모두 채워 주세요!");
    if (me) return alert("이미 로그인이 되어있어요");
    const data = {
      email,
      password,
    };
    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("response", response);
    const user = await response.json();
    setMe(user);
  };

  // 로그아웃 함수
  const logOut: AuthContextValue["logOut"] = async () => {
    if (!me) return alert("로그인하고 눌러주세요!");
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
