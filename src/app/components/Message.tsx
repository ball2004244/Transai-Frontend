"use client";

import React, { useState, useEffect, useRef } from "react";
import { getRoomMessages, sendMessageToRoom } from "@/app/apis";
import ErrBox from "./ErrBox";

interface Message {
  text: string;
  translated_text: string;
  sender: string | null;
}

interface UserData {
  _id: string;
  user_id: string;
  account_id: string;
  name: string;
  language: string;
}

interface MessageBubbleProps {
  data: Message;
}

function MessageBubble({ data }: MessageBubbleProps) {
  const { text, translated_text, sender } = data;
  const [user_id, setUser_id] = useState("");
  const [showTranslated, setShowTranslated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      setUser_id(user_data["user_id"] || "");
    }
  }, []);

  const messageContainerClass =
    "message-container flex flex-row items-center max-w-1/3 max-h-1/3 overflow-hidden m-2 p-2 " +
    (sender ? "justify-end" : "justify-start");

  const messageBubbleClass =
    "message-bubble flex flex-col items-start justify-center-400 rounded-lg p-2 m-2 max-w-[30vw] " +
    (sender ? "bg-blue-500" : "bg-gray-700");

  return (
    <div className={messageContainerClass}>
      <div className="message-col flex flex-col items-start justify-center-400 rounded-lg max-w-[30vw]">
        <div className="sender-name-container flex flex-row items-center justify-center">
          {sender !== user_id && (
            <h1 className="sender-name text-gray-800 text-lg font-bold break-all mx-10 my-0">
              Anonymous
            </h1>
          )}
        </div>
        <div className="flex flex-row items-center justify-center">
          {!sender && (
            <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
          )}
          <div
            className={messageBubbleClass}
            onClick={() => setShowTranslated(!showTranslated)}
          >
            <p className="message-content text-white break-all flex text-lg text-left">
              {sender !== user_id ? translated_text : text}
            </p>

            {showTranslated && (
              <p className="message-content text-white break-all flex italic text-left">
                {sender === user_id ? translated_text : text}
              </p>
            )}
          </div>
          {sender && (
            <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user_data, setUser_data] = useState<UserData>({
    _id: "",
    user_id: "",
    account_id: "",
    name: "",
    language: "",
  });

  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const messagesListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      if (user_data["user_id"]) setUser_data(user_data);

      const room_data = JSON.parse(localStorage.getItem("room_data") || "{}");
      if (room_data["room_id"]) setRoomId(room_data["room_id"]);
    }
  }, []);

  const retrieveMessages = async () => {
    try {
      const getRoomMessagesResponse = await getRoomMessages(roomId);
      if (getRoomMessagesResponse.status !== "success") {
        setError(getRoomMessagesResponse.message);
        return [];
      }

      const messages = getRoomMessagesResponse.data.map((message: any) => ({
        text: message["text"],
        translated_text: message["translated_text"].trim(),
        sender:
          message["user_id"] === user_data.user_id ? user_data.user_id : null,
      }));

      return messages;
    } catch (error) {
      setError("Cannot retrieve messages");
      return [];
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await retrieveMessages();
        setMessages(messages);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Cannot retrieve messages");
      }
    };

    if (!roomId) return;
    const intervalId = setInterval(loadMessages, 3000);

    loadMessages();

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [user_data, roomId]);

  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="messages-list items-center justify-start w-full h-[70vh] overflow-y-auto"
      ref={messagesListRef}
    >
      {error && <ErrBox message={error} onClose={() => setError("")} />}
      {messages.map((message, index) => (
        <MessageBubble key={index} data={message} />
      ))}
    </div>
  );
}

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [user_id, setUser_id] = useState("");
  const [room_id, setRoom_id] = useState("");
  const [language, setLanguage] = useState("en");
  const [numParticipants, setNumParticipants] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      const room_data = JSON.parse(localStorage.getItem("room_data") || "{}");
      if (user_data["user_id"]) setUser_id(user_data["user_id"]);
      if (user_data["language"]) setLanguage(user_data["language"]);

      if (room_data["room_id"]) setRoom_id(room_data["room_id"]);
      if (room_data["participants"]) setNumParticipants(room_data["participants"].length);
    }
  }, []);

  const verifyRoom = async () => {
    if (!room_id) {
      setErr("You are not in any room");
      return false;
    }

    if (numParticipants < 2) {
      setErr("Not enough people in the room");
      return false;
    }

    return true;
  };

  const verifyMessage = (message: string) => {
    message = message.trim();

    if (message.length < 1) {
      return false;
    }

    if (message.length > 500) {
      return false;
    }

    return true;
  };

  const sendMessage = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    try {
      if (!(await verifyRoom())) throw new Error("You are not in any room");

      if (!verifyMessage(message)) throw new Error("Invalid message");

      const response = await sendMessageToRoom(
        room_id,
        user_id,
        message,
        language
      );

      if (response.status !== "success") throw new Error(response.message);

      setMessage("");
      setErr("");
    } catch (error: any) {
      setMessage("");
      setErr(error.toString());
    }
  };

  return (
    <div className="message-input flex flex-row items-center justify-center self-end w-full border-t border-gray-800 h-[20vh] select-none">
      {err && <ErrBox message={err} onClose={() => setErr("")} />}
      <textarea
        className="message-input-field flex-1 w-full h-full p-2 m-auto text-sm text-gray-700 outline-none resize-none"
        placeholder="Type a message..."
        value={message}
        onKeyDown={sendMessage}
        onChange={(event) => setMessage(event.target.value)}
      />
    </div>
  );
}
