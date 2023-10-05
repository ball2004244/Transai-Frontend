// Message.tsx

interface Props {
  message: string;
  sender: string | null;
}

export function MessageBubble({ message, sender }: Props) {
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

export function MessageInput () {
  return (
    <div className="message-input flex flex-row items-center justify-center w-full bg-gray-200 border-t border-gray-300">
      <input
        type="text"
        className="message-input-field w-full h-full p-2 text-sm text-gray-700 outline-none"
        placeholder="Type a message..."
      />
    </div>
  );
}
