import { createContext, useCallback, useContext, useState } from 'react';

export const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [step, setStep] = useState('login'); // login | otp

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setStep('login')
  },[]);

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
