import { MessagesList, MessageInput } from "./components/Message";
import { Header } from "./components/Header";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 bg-white overflow-hidden">
      <Auth />
      <div className="main-div z-10 w-full max-h-screen items-center justify-between font-mono text-sm lg:flex flex-row">
        <div className="left-col hidden flex-col items-center justify-center lg:flex w-1/3 bg-gray-700">
          <div className="content flex flex-col items-center justify-center w-full min-w-screen min-h-screen">
            Nothing here yet
          </div>
        </div>
        <div className="right-col flex flex-col items-center justify-start w-full bg-white h-full min-h-screen self-start border border-gray-800">
          <div className="header flex flex-row items-center justify-between w-full bg-gray-200 border-b border-gray-300">
            <Header />
          </div>

          <div className="body flex flex-col items-center justify-center w-full overflow-y-auto h-full">
            <div className="flex flex-col items-center justify-center w-full">
              <MessagesList />
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
