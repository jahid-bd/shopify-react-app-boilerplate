import { Frame, Toast } from '@shopify/polaris';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ToastProps {
  content: string;
  success: boolean;
}

const MyToast: React.FC<ToastProps> = ({ content, success }) => {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive(false), []); // Changed to always set active to false to dismiss

  return (
    <>
      {active ? (
        <Toast content={content} error={!success} onDismiss={toggleActive} />
      ) : null}
    </>
  );
};

interface ToastContextType {
  showToast: (content: string, success: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastData, setToastData] = useState<{
    content: string;
    success: boolean;
  } | null>(null);

  const showToast = (content: string, success: boolean) => {
    setToastData({ content, success });
    setTimeout(() => setToastData(null), 5000); // Hide the toast after 5 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Frame>
        <main className="py-10">
          {children}
          {toastData && (
            <MyToast content={toastData.content} success={toastData.success} />
          )}
        </main>
      </Frame>
    </ToastContext.Provider>
  );
};
