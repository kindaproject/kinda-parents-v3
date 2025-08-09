/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, useContext, useState, useEffect } from "react";
import { WithChildren } from "../helpers";

const I18N_CONFIG_KEY =
  import.meta.env.VITE_APP_I18N_CONFIG_KEY || "i18nConfig";

type Props = {
  selectedLang: "de" | "en" | "es" | "fr" | "ja" | "zh" | "pt-BR";
};

type ContextType = Props & {
  setLanguage: (lang: string) => void;
};

const initialState: Props = {
  selectedLang: "en",
};

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as Props;
    } catch (er) {
      console.error(er);
    }
  }
  return initialState;
}

const I18nContext = createContext<ContextType>({
  ...initialState,
  setLanguage: () => {},
});

const useLang = () => {
  return useContext(I18nContext).selectedLang;
};

// Hook para obtener tanto el idioma como la función para cambiarlo
const useI18n = () => {
  return useContext(I18nContext);
};

const MetronicI18nProvider: FC<WithChildren> = ({ children }) => {
  // Inicializar estado con el valor del localStorage
  const [language, setLanguageState] = useState<Props["selectedLang"]>(() => {
    return getConfig().selectedLang;
  });

  // Función para cambiar idioma
  const setLanguage = (lang: string) => {
    const newLang = lang as Props["selectedLang"];
    setLanguageState(newLang);
    localStorage.setItem(
      I18N_CONFIG_KEY,
      JSON.stringify({ selectedLang: newLang })
    );
  };

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === I18N_CONFIG_KEY && e.newValue) {
        try {
          const config = JSON.parse(e.newValue) as Props;
          setLanguageState(config.selectedLang);
        } catch (error) {
          console.error("Error parsing language config:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue: ContextType = {
    selectedLang: language,
    setLanguage,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export { MetronicI18nProvider, useLang, useI18n };
