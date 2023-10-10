"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { getRoomData } from "@/app/apis";
import React, { useEffect } from "react";

// sample URL: http://localhost:3000/room?room_id=65239f64fd25a7e717388314
export default function Room() {
  const searchParams = useSearchParams();
  const room_id = searchParams.get("room_id") || "";
  const router = useRouter();

  const addRoomDataToLocalStorage = async () => {
    const roomRequest = await getRoomData(room_id);


    if (roomRequest.status !== "success") {
        router.push("/temp");
        return;
    }

    const roomData = roomRequest.data;

    localStorage.setItem("room_data", JSON.stringify(roomData));
  };

  useEffect(() => {
    if (!room_id) {
      router.push("/temp");
      return;
    }

    addRoomDataToLocalStorage();

    router.push("/");
  }, [room_id]);

  return (
    <div className="room-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0" />
  );
}
