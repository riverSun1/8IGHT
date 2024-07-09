"use client";

import { useState } from "react";

import { useAuth } from "@/contexts/auth.context";

function SignUpPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickSignUp = async () => {
    signUp(email, password);
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
      <button className="mt-3 button" onClick={handleClickSignUp}>
        가입하기
      </button>
    </div>
  );
}

export default SignUpPage;
