"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerToApp } from "@/app/apis";
import { LANGUAGES } from "@/app/utils";
import { authUIClass, authButtonClass, authTitleClass, inputFieldClass } from "../styles";

export default function RegisterUI() {
  return (
    <div className="auth-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0">
      <div className={authUIClass}>
        <Register />
      </div>
    </div>
  );
}

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("");

  const verifyInput = (
    username: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    phoneNumber: string,
    language: string
  ) => {
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
    if (
      !verifyInput(
        username,
        password,
        confirmPassword,
        fullName,
        phoneNumber,
        language
      )
    )
      return;

    const registerResponse = await registerToApp(
      username,
      password,
      fullName,
      phoneNumber,
      language
    );

    if (registerResponse.status !== "success") {
      console.log("register failed");
      return;
    }

    console.log("register success");
    router.push("/auth/login");
  };

  return (
    <div className="register-div flex flex-col items-center justify-center w-full h-full">
      <h1 className={authTitleClass}>Register your account</h1>
      <input
        className={inputFieldClass}
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={inputFieldClass}
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className={inputFieldClass}
        placeholder="confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        className={inputFieldClass}
        placeholder="Full name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className={inputFieldClass}
        placeholder="Phone number"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <select
        className={inputFieldClass}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="" disabled>
          Select language
        </option>
        {Object.keys(LANGUAGES).map((key) => (
          <option key={key} value={key}>
            {LANGUAGES[key]}
          </option>
        ))}
      </select>

      <button
        className={authButtonClass}
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
        className={authButtonClass}
        onClick={() => router.push("/auth/login")}
      >
        Go Back
      </button>
    </div>
  );
}
