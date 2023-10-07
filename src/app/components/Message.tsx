"use client";

import React, { useState, useEffect } from "react";

export function MessagesList() {
  // load conversation history from api
  const [messages, setMessages] = useState([]);
  const user_id = "651b8b95f9e87b31b2b3a369";

  // create an interval that overwrite the messages list with the list from api
  // every 5 seconds
  const retrieveMessages = async () => {
    // call api to retrieve messages

    const room_id = "651b95c6f11dcbfdec1cc59f";
    const URL = "http://localhost:8080/chat/room/" + room_id;

    const data = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    return data;
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await retrieveMessages();
      const messages = response["data"].map((message: any) => ({
        text: message["text"],
        sender: message["user_id"] === user_id ? user_id : null,
      }));

      setMessages(messages);
    }, 5000);

    // Call retrieveMessages once after the component is mounted
    retrieveMessages().then((response) => {
      const messages = response["data"].map((message: any) => ({
        text: message["text"],
        sender: message["user_id"] === user_id ? user_id : null,
      }));

      setMessages(messages);
    });

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="messages-list items-center justify-start w-full h-[70vh] overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBubble key={index} data={message} />
      ))}
    </div>
  );
}

interface Message {
  text: string;
  sender: string | null;
}

function MessageBubble({ data }: { data: Message }) {
  const { text, sender } = data;

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
        <p className="message-content text-white break-all">{text}</p>
      </div>

      {sender && (
        <div className="message-sender w-8 h-8 rounded-full bg-gray-400" />
      )}
    </div>
  );
}

export function MessageInput() {
  const [message, setMessage] = useState("");

  const sendMessage = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // only send when hit enter
    if (event.key !== "Enter") return;

    event.preventDefault();

    const request = {
      // create a mock user
      user_id: "651b8b95f9e87b31b2b3a369",
      room_id: "651b95c6f11dcbfdec1cc59f",
      text: message,
      language: "en"
    };

    const URL = "http://localhost:8080/chat";

    // use fetch
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    console.log(response);
    setMessage("");
  };

  return (
    <div className="message-input flex flex-row items-center justify-center self-end w-full border-t border-gray-800 h-[20vh]">
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
