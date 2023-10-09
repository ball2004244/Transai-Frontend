"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrBox from "./ErrBox";
import { API_URL } from "../api";

function InRoomBar({ onExit }: { onExit: () => void }) {
  const [roomID, setRoomID] = useState("123456");
  const [userId, setUserId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  const handleExitClick = async () => {
    // call leave room api
    // remove room data from local storage

    try {
      const URL = `${API_URL}/room/leave`;

      const data = {
        room_id: roomID,
        user_id: userId,
      };

      const request = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();

      if (response.status !== "success") {
        setErrMessage(response.message);
        return;
      }

      //   remove room data from local storage

      localStorage.removeItem("room_data");
      onExit();
      router.push("/temp");
    } catch (err) {
      setErrMessage("Invalid room id");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      setUserId(user_data["user_id"] || "");

      const room_data = JSON.parse(localStorage.getItem("room_data") || "{}");
      setRoomID(room_data["room_id"] || "");
    }
  }, []);

  return (
    <div className="in-room-bar flex flex-row items-center justify-center w-full bg-gray-700 min-h-[3vh] max-h-[5vh] p-2">
      <div className="room-id flex flex-row items-center justify-center w-full min-w-[30vw] max-w-[35vw] h-full bg-gray-800 rounded-lg p-2 mx-4">
        Room ID: {roomID}
      </div>
      <button
        className="exit-btn flex flex-row items-center justify-center w-full max-w-[10vw] h-full bg-gray-800 rounded-lg p-2 mx-4"
        onClick={handleExitClick}
      >
        Exit
      </button>
    </div>
  );
}

function OutRoomBar({ onJoin }: { onJoin: () => void }) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [userId, setUserId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  //TODO: Implement exit buttons for 2 forms: join room & create room
  const handleJoinClick = () => {
    setShowJoinForm(true);
    setShowCreateForm(false);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
    setShowJoinForm(false);
  };

  const addRoomToLocalStorage = async (response: any) => {
    const roomId: string = response.data.room_id;
    const room_data = await getRoomData(roomId);

    console.log(room_data);
    localStorage.setItem("room_data", JSON.stringify(room_data));

  }
    
  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // call join room api
      const URL = `${API_URL}/room/join`;

      const data = {
        room_id: roomName,
        user_id: userId,
      };

      // fetch the put request
      const request = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // get the response
      const response = await request.json();

      if (response.status !== "success") {
        setErrMessage(response.message);
        return;
      }

      // add room data to local storage
      await addRoomToLocalStorage(response);

      onJoin();
      router.push("/temp");

    } catch (err) {
      setErrMessage("Invalid room id");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // call create room api
    // add room data to local storage
    e.preventDefault();

    const URL = `${API_URL}/room`;

    const data = {
      user_ids : [userId],
    };

    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      });

    const response = await request.json();

    if (response.status !== "success") {
      setErrMessage(response.message);
      return;
    }

    // add room data to local storage
    await addRoomToLocalStorage(response);

    onJoin();
    router.push("/temp");
  };

  const getRoomData = async (room_id: string) => {
    try {
      const URL = `${API_URL}/room/${room_id}`;

      const request = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      if (response.status !== "success") {
        setErrMessage(response.message);
        return;
      }

      return response.data;
    } catch (err) {
      setErrMessage("Invalid room id");
    }
  };

  // get user id from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      setUserId(user_data["user_id"] || "");
    }
  }, []);

  return (
    <div className="out-room-bar flex flex-row items-center justify-center w-full bg-gray-700 min-h-[3vh] max-h-[5vh] p-2">
      <button
        className="create-btn flex flex-row items-center justify-center w-56 h-full bg-gray-800 rounded-lg p-2 ml-0 mx-4 select-none"
        onClick={handleCreateClick}
      >
        Create Room
      </button>
      <button
        className="join-btn flex flex-row items-center justify-center w-56 h-full bg-gray-800 rounded-lg p-2 mx-4 select-none"
        onClick={handleJoinClick}
      >
        Join Room
      </button>
      {showJoinForm && (
        <div className="join-room-form flex flex-col items-center justify-center w-full h-full bg-gray-700 absolute top-0 left-0 z-10 opacity-70 select-none">
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={handleJoinSubmit}
          >
            <h1 className="text-2xl lg:text-4xl text-center font-bold text-white">
              Enter Room ID
            </h1>
            <input
              className="room-id text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4 outline-none"
              placeholder="Room ID"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="join-btn text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4 select-none">
              Join
            </button>
          </form>
        </div>
      )}
      {showCreateForm && (
        <div className="create-room-form flex flex-col items-center justify-center w-full h-full bg-gray-700 absolute top-0 left-0 z-10 opacity-70 select-none">
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={handleCreateSubmit}
          >
            <h1 className="text-2xl lg:text-4xl text-center font-bold text-white">
              Create Room
            </h1>
            <input
              className="room-name text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-3/4 outline-none"
              placeholder="Room Name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="create-btn text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-3/4 select-none">
              Create
            </button>
          </form>
        </div>
      )}
      {errMessage && (
        <ErrBox message={errMessage} onClose={() => setErrMessage("")} />
      )}
    </div>
  );
}

export function UtilsBar() {
  const [isInRoom, setIsInRoom] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const room_data = JSON.parse(localStorage.getItem("room_data") || "{}");

      if (room_data["room_id"]) {
        setIsInRoom(true);
      }
    }
  }, []);

  return (
    <div className="utils-bar flex flex-row items-center justify-center w-full bg-gray-700 min-h-[3vh] max-h-[5vh] p-2">
      {isInRoom ? (
        <InRoomBar onExit={() => setIsInRoom(false)} />
      ) : (
        <OutRoomBar onJoin={() => setIsInRoom(true)} />
      )}
    </div>
  );
}
