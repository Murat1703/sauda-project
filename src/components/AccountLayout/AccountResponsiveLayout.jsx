import { useMediaQuery } from 'react-responsive';
import { AccountLayout } from './AccountLayout';
import { MobileAccountLayout } from './MobileAccountLayout';

export const AccountResponsiveLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileAccountLayout /> : <AccountLayout />;
};