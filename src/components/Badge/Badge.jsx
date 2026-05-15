import cls from './Badge.module.css'

export const Badge = ({ type, children }) => {
  return (
    <span
      className={`${cls.badge} ${
        type === 'new'
          ? cls.newBadge
          : cls.discountBadge
      }`}
    >
      {children}
    </span>
  );
};