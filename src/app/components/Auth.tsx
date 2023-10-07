"use client";
import React, { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  return (
    !isLogin && (
      <div className="auth-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800">
        <div className="auth-content flex flex-col items-center justify-center w-1/4 h-1/2 bg-white rounded-lg">
          {isRegisterPage ? (
            <Register
              isRegisterPage={isRegisterPage}
              setIsRegisterPage={setIsRegisterPage}
            />
          ) : (
            <Login
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setIsRegisterPage={setIsRegisterPage}
            />
          )}
        </div>
      </div>
    )
  );
}

function Login({
  isLogin,
  setIsLogin,
  setIsRegisterPage,
}: {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
  setIsRegisterPage: (state: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (username: string, password: string) => {
    // call api to login

    // if success, set isLogin to true
    const testUser = {
      username: "test",
      password: "test",
    };
    if (username === testUser.username && password === testUser.password) {
      console.log("login success");
      setIsLogin(true);
      return;
    }

    // else, show error message
    console.log("login failed");
  };

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
        onClick={() => setIsRegisterPage(true)}
      >
        Register
      </button>
    </div>
  );
}

function Register({
  isRegisterPage,
  setIsRegisterPage,
}: {
  isRegisterPage: boolean;
  setIsRegisterPage: (state: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const goBack = () => {
    setIsRegisterPage(false);
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
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="password"
        type="password"
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="confirm password"
        type="password"
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="Full name"
        type="text"
      />
      <input
        className="username text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4"
        placeholder="Email"
        type="email"
      />

      <button className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4">
        Register
      </button>
      <button
        className="auth-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4"
        onClick={() => goBack()}
      >
        Go back
      </button>
    </div>
  );
}
