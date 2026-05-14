import { createContext, useContext, useState } from 'react';

export const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [step, setStep] = useState('login'); // login | otp

  const openAuthModal = () => {
    setStep('login');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalOpen,
        step,
        setStep,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
