import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import Toast, { ToastOptions } from "../components/Toast/Toast";

interface ModalOptions {
  title: string;
  content: ReactNode;
}

interface UIContextValue {
  toastVisible: boolean;
  toastOptions: ToastOptions | null;
  showToast: (opts: ToastOptions) => void;
  hideToast: () => void;

  modalVisible: boolean;
  modalOptions: ModalOptions | null;
  openModal: (opts: ModalOptions) => void;
  closeModal: () => void;

  store: Record<string, any>;
  setStore: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);

  const showToast = useCallback((opts: ToastOptions) => {
    setToastVisible(false);
    setTimeout(() => {
      setToastOptions(opts);
      setToastVisible(true);
    }, 100);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const openModal = useCallback((opts: ModalOptions) => {
    setModalOptions(opts);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Nuevo store general
  const [store, setStore] = useState<Record<string, any>>({});

  const value: UIContextValue = {
    toastVisible,
    toastOptions,
    showToast,
    hideToast,
    modalVisible,
    modalOptions,
    openModal,
    closeModal,
    store,
    setStore,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      <Toast />
    </UIContext.Provider>
  );
};

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI debe usarse dentro de un UIProvider");
  }
  return ctx;
}
