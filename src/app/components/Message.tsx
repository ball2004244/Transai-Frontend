"use client";

import React, { useState, useEffect, useRef, use } from "react";

function ErrBox({ message, onClose }: { message: string, onClose: () => void }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="err-box flex items-center justify-center w-1/4 h-[4vh] bg-red-500 absolute top-0 self-center m-4 p-2 rounded-md">
      <p className="text-white text-center">{message}</p>
    </div>
  );
}

export function MessagesList() {
  const [messages, setMessages] = useState([]);
  let user_id = "";
  const [error, setError] = useState("");
  const messagesListRef = useRef<HTMLDivElement>(null); // create a ref to the messages list container

  if (typeof window !== "undefined") 
    user_id = localStorage.getItem("user_id") || "";
  

  // update the messages list every 5s
  const retrieveMessages = async () => {

    const room_id = localStorage.getItem("room_id") || "";
    const URL = "http://localhost:8080/chat/room/" + room_id;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const messages = data["data"].map((message: any) => ({
        text: message["text"],
        translated_text: message["translated_text"],
        sender: message["user_id"] === user_id ? user_id : null,
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

    const intervalId = setInterval(loadMessages, 3000);

    // Call retrieveMessages once after the component is mounted
    loadMessages();

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // scroll to the bottom of the messages list when a new message is added
  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages-list items-center justify-start w-full h-[70vh] overflow-y-auto" ref={messagesListRef}>
      {error && <ErrBox message={error} onClose={() => setError("")} />}
      {messages.map((message, index) => (
        <MessageBubble key={index} data={message} />
      ))}
    </div>
  );
}

interface Message {
  text: string;
  translated_text: string;
  sender: string | null;
}

function MessageBubble({ data }: { data: Message }) {
  const { text, translated_text, sender } = data;
  let user_id = "";

  if (typeof window !== "undefined") 
    user_id = localStorage.getItem("user_id") || "";

  const messageContainerClass =
    "message-container flex flex-row items-center max-w-1/3 max-h-1/3 overflow-hidden m-2 p-2 " +
    (sender ? "justify-end" : "justify-start");

  const messageBubbleClass =
    "message-bubble flex items-center justify-center-400 rounded-lg p-2 m-2 max-w-[30vw] " +
    (sender ? "bg-blue-500" : "bg-gray-700");

  return (
    <div className={messageContainerClass}>
      {!sender && (
        <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
      )}
      <div className={messageBubbleClass}>
        <p className="message-content text-white break-all">{sender !== user_id ? translated_text : text}</p>
      </div>

      {sender && (
        <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
      )}
    </div>
  );
}

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const messagesListRef = useRef<HTMLDivElement>(null); // create a ref to the messages list container
  let user_id = "";
  let room_id = "";
  let language = "en";

  if (typeof window !== "undefined") {
    // get user_id from localStorage
    user_id = localStorage.getItem("user_id") || "";
    room_id = localStorage.getItem("room_id") || "";
    language = localStorage.getItem("language") || "en";
  }

  const verifyMessage = (message: string) => {
    // strip message of whitespace
    message = message.trim();

    // check if message is too short
    if (message.length < 1) {
      // console.log("Message too short");
      return false;
    }

    // check if message is too long
    if (message.length > 500) {
      // console.log("Message too long");
      return false;
    }

    return true;
  };
  const sendMessage = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // only send when hit enter
    if (event.key !== "Enter") return;

    event.preventDefault();

    const request = {
      user_id: user_id,
      room_id: room_id,
      text: message,
      language: language,
    };

    const URL = "http://localhost:8080/chat";

    try {
      if (!verifyMessage(message)) throw new Error("Invalid message");

      // use fetch
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      setMessage("");
      setErr("");
    } catch (error) {
      console.log("Cannot send message");
      setMessage("");
      setErr("Cannot send message");
    }
  };

  return (
    <div className="message-input flex flex-row items-center justify-center self-end w-full border-t border-gray-800 h-[20vh]">
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
