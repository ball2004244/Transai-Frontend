"use client";

import React, { useState } from "react";

interface Props {
  message: string;
  sender: string | null;
}

export function MessagesList() {
  // load conversation history from api
  const [messages, setMessages] = useState([
    {
      message: "Hello world",
      sender: "Me",
    },
    {
      message: "How are you?",
      sender: null,
    },
  ]);

  return (
    <div className="chatroom flex flex-col items-center justify-start w-full h-[80vh] overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message.message}
          sender={message.sender}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message, sender }: Props) {
  const messageContainerClass =
    "message-container flex flex-row items-center justify-center max-w-1/3 max-h-1/3 overflow-hidden m-2 p-2 " +
    (sender ? "ml-auto" : "mr-auto");

  const messageBubbleClass =
    "message-bubble flex items-center justify-center-400 rounded-lg p-2 m-2 " +
    (sender ? "bg-blue-500" : "bg-gray-300");

  return (
    <div className={messageContainerClass}>
      {!sender && (
        <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
      )}
      <div className={messageBubbleClass}>
        <p className="message-content text-white break-all">{message}</p>
      </div>

      {sender && (
        <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
      )}
    </div>
  );
}

export function MessageInput() {
  const [message, setMessage] = useState("");

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // only send when hit enter
    if (event.key !== "Enter") return;

    event.preventDefault();

    // add the message to the messages list
    // by sending new messsage to the api

    setMessage("");
  };

  return (
    <div className="message-input flex flex-row items-center justify-center self-end w-full h-full border-t border-gray-800 h-[13vh]">
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
