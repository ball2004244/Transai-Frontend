"use client";

import React, { useState, useEffect } from "react";
import { loginToApp } from "@/app/apis";
import { useRouter } from "next/navigation";
import ErrBox from "@/app/components/ErrBox";

export default function LoginUI() {
  return (
    <div className="auth-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0">
      <div className="auth-content flex flex-col items-center justify-center w-[30vw] min-h-[40vh] max-h-[60vh] bg-white rounded-lg p-4 m-2">
        <Login />
      </div>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      // call api to login
      const loginResponse = await loginToApp(username, password);

      if (loginResponse.status !== "success") {
        setErr(loginResponse.message);
        return;
      }
      
      const data = loginResponse.data;
      localStorage.setItem("user_data", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      setErr("Something went wrong");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      if (user_data["user_id"]) router.push("/");
    }
  }, []);

  return (
    <div className="login-div flex flex-col items-center justify-center w-full h-full">
      {err && <ErrBox message={err} onClose={() => setErr("")} />}
      <h1 className="login-title text-2xl lg:text-4xl text-center font-bold text-gray-800">
        Login to chat
      </h1>
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4"
        onClick={() => login(username, password)}
      >
        Login
      </button>
      <button
        className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4"
        onClick={() => router.push("/auth/register")}
      >
        Register
      </button>
    </div>
  );
}
