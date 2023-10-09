"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Temp() {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      setUserData(user_data);
      if (!user_data["user_id"]) router.push("/auth/login");

      router.push("/");
    }
  }, []);

  <div className="temp-div flex flex-col items-center justify-center w-full h-full" />;
}
