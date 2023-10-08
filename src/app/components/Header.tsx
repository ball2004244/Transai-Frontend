"use client";

import React, { useState } from "react";

function LanguageButton({ language, setLanguage, setSelectLangState }: { language: string, setLanguage: (language: string) => void, setSelectLangState: (state: boolean) => void }) {
  return (
    <button className="language-button text-white font-bold text-lg bg-gray-700 rounded-lg p-2 m-2 max-w-[22vw] w-[20vw]"
      onClick={() => {
        setLanguage(language);
        setSelectLangState(false);
      }}>
      {language}
    </button>
  );
}

function LanguageList({ setLanguage, setSelectLangState }: { setLanguage: (language: string) => void, setSelectLangState: (state: boolean) => void }) {
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
        <LanguageButton key={index} language={language.language} setLanguage={setLanguage} setSelectLangState={setSelectLangState} />
      ))}
    </div>
  );
}

export function Header() {
  const [language, setLanguage] = useState("English");

  const [selectLangState, setSelectLangState] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center px-4 py-2 bg-gray-800 w-full">
      <div className="user-div flex flex-row items-center justify-center">
        <div className="user-img rounded-full w-10 h-10 bg-gray-500" />
        <div className="user-name ml-2 text-white font-bold text-lg">
          Tam Nguyen
        </div>
      </div>
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
