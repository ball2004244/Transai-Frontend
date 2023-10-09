"use client";

import React, { useState, useEffect } from "react";

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

interface UserData {
  _id: string;
  user_id: string;
  account_id: string;
  name: string;
  language: string;
}

export function Header() {
  const LANGUAGES: { [key: string]: string } = {
    en: "English",
    fr: "French",
    de: "German",
    es: "Spanish",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    hi: "Hindi",
    ar: "Arabic",
    pt: "Portuguese",
    pa: "Punjabi",
    mr: "Marathi",
    ta: "Tamil",
    te: "Telugu",
    ur: "Urdu",
    vi: "Vietnamese",
    ko: "Korean",
    jv: "Javanese",
    ms: "Malay",
    tl: "Tagalog",
    id: "Indonesian",
    tr: "Turkish",
    it: "Italian",
    nl: "Dutch",
    pl: "Polish",
    sr: "Serbian",
    uk: "Ukrainian",
    cs: "Czech",
    ro: "Romanian",
    bg: "Bulgarian",
    hu: "Hungarian",
    sv: "Swedish",
    sk: "Slovak",
    hr: "Croatian",
    da: "Danish",
    fi: "Finnish",
    no: "Norwegian",
    el: "Greek",
    ml: "Malayalam",
    th: "Thai",
    so: "Somali",
    fil: "Filipino",
    he: "Hebrew",
    yi: "Yiddish",
    hy: "Armenian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    ka: "Georgian",
    gu: "Gujarati",
    kk: "Kazakh",
    am: "Amharic",
    km: "Khmer",
    kn: "Kannada",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    mg: "Malagasy",
    mt: "Maltese",
    mi: "Maori",
    mk: "Macedonian",
    mn: "Mongolian",
    my: "Burmese",
    ne: "Nepali",
    or: "Odia",
    ps: "Pashto",
    fa: "Persian",
    sq: "Albanian",
    si: "Sinhala",
    sd: "Sindhi",
    su: "Sundanese",
    sw: "Swahili",
    tg: "Tajik",
    tt: "Tatar",
    bo: "Tibetan",
    to: "Tonga",
    tk: "Turkmen",
    ug: "Uyghur",
    uz: "Uzbek",
    cy: "Welsh",
    fy: "Frisian",
    wo: "Wolof",
    ha: "Hausa",
    yo: "Yoruba",
    zu: "Zulu",
  };

  const [language, setLanguage] = useState("English"); // default language is "English
  const [name, setName] = useState("Guest");
  const [selectLangState, setSelectLangState] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
      if (user_data["language"]) setLanguage(LANGUAGES[user_data["language"]]);

      if (user_data["name"]) setName(user_data["name"]);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between items-center px-4 py-2 bg-gray-800 w-full">
      <div className="user-div flex flex-row items-center justify-center">
        <div className="user-img rounded-full w-10 h-10 bg-gray-500" />
        <div className="user-name ml-2 text-white font-bold text-lg">
          {name}
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
