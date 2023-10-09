"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../api";

export default function RegisterUI() {
  return (
    <div className="auth-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0">
      <div className="auth-content flex flex-col items-center justify-center w-[30vw] min-h-[40vh] max-h-[60vh] bg-white rounded-lg p-4 m-2">
        <Register />
      </div>
    </div>
  );
}

function Register({}: {}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("");

  const URL = `${API_URL}/auth/register`;

  const verifyInput = () => {
    // verify input
    if (username === "") {
      console.log("username is empty");
      return false;
    }
    if (password === "") {
      console.log("password is empty");
      return false;
    }
    if (confirmPassword === "") {
      console.log("confirm password is empty");
      return false;
    }
    if (fullName === "") {
      console.log("full name is empty");
      return false;
    }
    if (phoneNumber === "") {
      console.log("phone number is empty");
      return false;
    }
    if (language === "") {
      console.log("language is empty");
      return false;
    }

    if (password !== confirmPassword) {
      console.log("password not match");
      return false;
    }
    return true;
  };

  const register = async ({
    username,
    password,
    confirmPassword,
    fullName,
    phoneNumber,
    language,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phoneNumber: string;
    language: string;
  }) => {
    // call api to register
    if (!verifyInput()) {
      return;
    }

    const data = {
      username,
      password,
      name: fullName,
      phone_number: phoneNumber,
      language,
    };

    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    // if success, set isLogin to true
    if (response.status === "success") {
      console.log("register success");
      router.push("/auth/login");
      return;
    }
  };

  return (
    <div className="register-div flex flex-col items-center justify-center w-full h-full">
      <h1 className="register-title text-2xl lg:text-4xl text-center font-bold text-gray-800">
        Register your account
      </h1>
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="Full name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="Phone number"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="Language"
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <button
        className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4"
        onClick={() =>
          register({
            username,
            password,
            confirmPassword,
            fullName,
            phoneNumber,
            language,
          })
        }
      >
        Register
      </button>
      <button
        className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4"
        onClick={() => router.push("/auth/login")}
      >
        {" "}
        Go Back
      </button>
    </div>
  );
}
