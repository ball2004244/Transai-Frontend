"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrBox from "./ErrBox";
import { getRoomData, joinRoom, leaveRoom, createRoom, FRONTEND_URL } from "@/app/apis";

function QRCodeUI({
  roomID,
  onClose,
}: {
  roomID: string;
  onClose: () => void;
}) {
  const QrGenURL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=`;
  const userAccessURL = `${FRONTEND_URL}/room?room_id=${roomID}`;

  const AccessibleQrURL = `${QrGenURL}${userAccessURL}`;

  return (
    <div className="qr-container absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0">
      <div className="qr-container-col flex flex-col items-center justify-center z-20 w-1/3 bg-white rounded-lg p-4 m-2">
        <h1 className="qr-title text-3xl lg:text-5xl text-center font-bold text-gray-800 mt-4 p-2">
          Scan to Join
        </h1>
        <div className="qr-code flex flex-col items-center justify-center w-fit h-fit">
          <img className="qr-img rounded-lg h-3/4" src={AccessibleQrURL} />
        </div>
        <h3 className="access-url text-lg lg:text-xl text-center italic text-gray-800 bg-gray-200 rounded-lg p-2 m-2">
          {userAccessURL}
        </h3>
        <button
          className="close-btn rounded-full p-2 m-2 text-gray-700 text-2xl font-bold w-fit select-none"
          onClick={onClose}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

function InRoomBar({ onExit }: { onExit: () => void }) {
  const [roomID, setRoomID] = useState("123456");
  const [userId, setUserId] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const router = useRouter();

  const handleExitClick = async () => {
    // call leave room api
    try {
      const leaveRoomResponse = await leaveRoom(roomID, userId);

      if (leaveRoomResponse.status !== "success") {
        setErrMessage(leaveRoomResponse.message);
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
      {showQRCode && (
        <QRCodeUI roomID={roomID} onClose={() => setShowQRCode(false)} />
      )}
      <button
        className="room-id flex flex-row items-center justify-center w-full min-w-[30vw] max-w-[35vw] h-full bg-gray-800 rounded-lg p-2 mx-4"
        onClick={() => setShowQRCode(true)}
      >
        Room ID: {roomID}
      </button>
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
    const room_response = await getRoomData(roomId);

    if (room_response.status !== "success") {
      setErrMessage(room_response.message);
      return;
    }

    const room_data = room_response.data;
    localStorage.setItem("room_data", JSON.stringify(room_data));
  };

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // call join room api
      const joinRoomResponse = await joinRoom(roomName, userId);

      if (joinRoomResponse.status !== "success") {
        setErrMessage(joinRoomResponse.message);
        return;
      }
      await addRoomToLocalStorage(joinRoomResponse);

      onJoin();
      router.push("/temp");
    } catch (err) {
      setErrMessage("Invalid room id");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // call create room api
    e.preventDefault();

    const createRoomResponse = await createRoom(userId);

    if (createRoomResponse.status !== "success") {
      setErrMessage(createRoomResponse.message);
      return;
    }

    // add room data to local storage
    await addRoomToLocalStorage(createRoomResponse);

    onJoin();
    router.push("/temp");
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
              className="room-id text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-1/2 outline-none"
              placeholder="Room ID"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="nav-btns flex flex-col items-center justify-center w-1/2">
              <button className="join-btn text-white font-bold text-xl bg-gray-700 rounded-lg p-2 mx-2 w-fit select-none">
                Join
              </button>
              <button
                className="exit-btn text-white font-bold text-xl bg-gray-700 rounded-lg p-2 mx-2 w-fit select-none"
                onClick={() => setShowJoinForm(false)}
              >
                Go Back
              </button>
            </div>
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
              className="room-name text-sm text-gray-800 bg-gray-200 rounded-lg p-2 m-2 w-1/2 outline-none"
              placeholder="Room Name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="nav-btns flex flex-col items-center justify-center w-1/2">
              <button className="create-btn text-white font-bold text-xl bg-gray-700 rounded-lg p-2 mx-2 w-fit select-none">
                Create
              </button>
              <button
                className="exit-btn text-white font-bold text-xl bg-gray-700 rounded-lg p-2 mx-2 w-fit select-none"
                onClick={() => setShowCreateForm(false)}
              >
                Go Back
              </button>
            </div>
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
