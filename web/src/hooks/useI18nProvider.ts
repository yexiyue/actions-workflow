import { dynamicActivate } from "@/i18n";
import { createContext, useContext, useEffect, useState } from "react";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";

export const useLanguageProvider = () => {
  const [local, setLocal] = useState("zh");

  useEffect(() => {
    dynamicActivate(local);
  }, [local]);

  const toggleLocal = () => {
    setLocal(local === "zh" ? "en" : "zh");
  };

  return {
    local,
    antdLocal: local === "zh" ? zhCN : enUS,
    toggleLocal,
  };
};

export const LanguageContext = createContext({
  local: "zh",
  toggleLocal: () => {},
});

export const useChangeLanguage = () => {
  return useContext(LanguageContext);
};
