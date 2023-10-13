"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { getRoomData, joinRoom } from "@/app/apis";
import React, { useEffect } from "react";

// sample URL: http://localhost:3000/room?room_id=65239f64fd25a7e717388314
export default function Room() {
  const searchParams = useSearchParams();
  const room_id = searchParams.get("room_id") || "";
  const router = useRouter();
  let user_data: any = {};

  const addRoomDataToLocalStorage = async (user_id: string, room_id: string) => {
    const roomRequest = await joinRoom(room_id, user_id);

    if (roomRequest.status !== "success") {
        router.push("/");
        return;
    }

    const roomData = roomRequest.data;
  
    // add new room data
    localStorage.setItem("room_data", JSON.stringify(roomData));
  };

  useEffect(() => {
    if (!room_id) {
      router.push("/");
      return;
    }

    if (typeof window !== "undefined") {
      user_data = JSON.parse(localStorage.getItem("user_data") || "{}");

      if (!user_data["user_id"]) {
        router.push("/temp");
        return;
      }
    }

    addRoomDataToLocalStorage(user_data["user_id"], room_id);

    router.push("/");
  }, [room_id]);

  return (
    <div className="room-div absolute z-20 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0" />
  );
}
