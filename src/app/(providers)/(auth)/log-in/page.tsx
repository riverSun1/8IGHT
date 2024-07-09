"use client";

import { useAuth } from "@/contexts/auth.context";
import { useState } from "react";

function LoginPage() {
  const { logIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickLogIn = async () => {
    logIn(email, password);
  };

  return (
    <div className="max-w-96 flex flex-col">
      <input
        className="input"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-3 button" onClick={handleClickLogIn}>
        로그인하기
      </button>
    </div>
  );
}

export default LoginPage;
