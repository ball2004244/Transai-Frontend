import { MessageBubble, MessageInput } from "./components/Message";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 bg-white">
      <div className="main-div z-10 max-w-7xl w-full max-h-screen items-center justify-between font-mono text-sm lg:flex flex-row h-full">
        <div className="left-col hidden flex-col items-center justify-center lg:flex w-1/3 bg-gray-700">
          <div className="content flex flex-col items-center justify-center w-full h-screen bg-gray-700">
            Nothing here yet
          </div>
        </div>
        <div className="right-col flex flex-col items-center justify-center w-full bg-white h-full self-start">
          <div className="header flex flex-row items-center justify-between w-full bg-gray-200 border-b border-gray-300">
            Header
          </div>

          <div className="body flex flex-col items-center justify-center w-full overflow-y-auto h-full">
            <div className="chatroom flex flex-col items-center justify-center w-full">
              <MessageBubble message="Hello world" sender="Me" />
              <MessageBubble message="Hello world" sender={null} />
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
