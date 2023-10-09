"use client";

import React, { useState, useEffect } from "react";
import { API_URL } from "../../api";
import { useRouter } from "next/navigation";

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
  
  const router = useRouter();
  const URL = API_URL + "/auth/login";

  const login = async (username: string, password: string) => {
    // call api to login
    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const response = await request.json();

    if (response["status"] === "success") {
      localStorage.setItem("user_data", JSON.stringify(response.data));
      router.push("/");
    }

    console.log("login failed");
  };

  useEffect(() => {
    // check if user_data exists in local storage
    // if exists, redirect to home page
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      if (user_data["user_id"]) router.push("/");
    }
  }
  , []);

  return (
    <div className="login-div flex flex-col items-center justify-center w-full h-full">
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
