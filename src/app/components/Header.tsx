"use client";

import React, { useState, useEffect } from "react";
import { LANGUAGES } from "@/app/utils";

function LanguageButton({
  language,
  setLanguage,
  setSelectLangState,
}: {
  language: string;
  setLanguage: (language: string) => void;
  setSelectLangState: (state: boolean) => void;
}) {
  return (
    <button
      className="language-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 max-w-[22vw] w-[20vw]"
      onClick={() => {
        setLanguage(language);
        setSelectLangState(false);
      }}
    >
      {language}
    </button>
  );
}

function LanguageList({
  setLanguage,
  setSelectLangState,
}: {
  setLanguage: (language: string) => void;
  setSelectLangState: (state: boolean) => void;
}) {
  const [languages, setLanguages] = useState([
    {
      language: "English",
    },
    {
      language: "Vietnamese",
    },
  ]);

  return (
    <div className="language-list flex flex-col items-center justify-center w-screen h-screen absolute top-0 left-0 bg-gray-800">
      {languages.map((language, index) => (
        <LanguageButton
          key={index}
          language={language.language}
          setLanguage={setLanguage}
          setSelectLangState={setSelectLangState}
        />
      ))}
    </div>
  );
}

function LogOutPopup({
  setDisplayLogOutPopup,
}: {
  setDisplayLogOutPopup: (state: boolean) => void;
}) {
  return (
    <div className="logout-popup flex flex-col items-center justify-center w-screen h-screen absolute top-0 left-0 bg-gray-800">
      <button
        className="logout-btn text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-[20vw] max-w-[22vw]"
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("user_data");
            window.location.reload();
          }
        }}
      >
        Log Out
      </button>
      <button
        className="cancel-btn text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 w-[20vw] max-w-[22vw]"
        onClick={() => setDisplayLogOutPopup(false)}
      >
        Go Back
      </button>
    </div>
  );
}

export function Header() {
  

  const [language, setLanguage] = useState("English"); // default language is "English
  const [name, setName] = useState("Guest");
  const [selectLangState, setSelectLangState] = useState(false);
  const [displayLogOutPopup, setDisplayLogOutPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      if (user_data["language"]) setLanguage(LANGUAGES[user_data["language"]]);

      if (user_data["name"]) setName(user_data["name"]);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between items-center px-4 py-2 bg-gray-800 w-full">
      <button
        className="user-div flex flex-row items-center justify-center"
        onClick={() => setDisplayLogOutPopup(!displayLogOutPopup)}
      >
        <div className="user-img rounded-full w-10 h-10 bg-gray-500" />
        <div className="user-name ml-2 text-white font-bold text-lg">
          {name}
        </div>
      </button>
      {displayLogOutPopup && (
        <LogOutPopup setDisplayLogOutPopup={setDisplayLogOutPopup} />
      )}
      <div className="language-div flex flex-row items-center justify-center">
        <button
          className="language-text text-white"
          onClick={() => setSelectLangState(!selectLangState)}
        >
          Language: {language}
        </button>
      </div>
      {/* {selectLangState && <LanguageList setLanguage={setLanguage} setSelectLangState={setSelectLangState} />} */}
    </div>
  );
}
