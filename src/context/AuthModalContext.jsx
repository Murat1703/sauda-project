import { createContext, useCallback, useContext, useState } from 'react';

const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [step, setStep] = useState('login'); 
  const [newOrderPhone, setNewOrderPhone] = useState(null);
  // login | otp | profile | user

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(prev => {
    if (!prev) {
      setStep('login');
      setNewOrderPhone(null)
      return true;
    }

    return prev;

    });
    // setStep('login');
  }, []);

  const openAuthModalOtp = useCallback(() => {
    setIsAuthModalOpen(prev => {
    if (!prev) {
      setStep('otp');
      return true;
    }

    return prev;

    });
    // setStep('login');
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(prev => {
      if (!prev) return prev;

      setStep('login');
      return false;
    });
    // setStep('login');
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalOpen,
        step,
        setStep,
        openAuthModal,
        closeAuthModal,
        openAuthModalOtp,
        newOrderPhone,
        setNewOrderPhone
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModal должен использоваться внутри AuthModalProvider');
  }

  return context;
};