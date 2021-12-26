import React, { useState, useEffect, createContext } from "react";

interface LangContextProps {
  langType: string;
  setLangType: React.Dispatch<React.SetStateAction<string>>;
}

const LangContext = createContext({} as LangContextProps);

export const LangProvider: React.FC = (props) => {
  const langKey = "LANG";
  const langStore = localStorage.getItem(langKey);

  const [langType, setLangType] = useState<string>(
    langStore ? String(langStore) : ""
  );

  useEffect(() => {
    localStorage.setItem(langKey, JSON.stringify(langType));
    console.log(langType);
  }, [langType]);

  return (
    <LangContext.Provider
      value={{
        langType,
        setLangType,
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
