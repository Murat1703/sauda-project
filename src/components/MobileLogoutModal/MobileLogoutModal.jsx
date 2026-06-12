import cls from './MobileLogoutModal.module.css'
import { useAuth } from '../../context/AuthContext.jsx';
import { BlackCloseIcon } from '../../../public/assets/icons/BlackCloseIcon';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore.js';
// import { useAuth } from '../../context/AuthContext';

export const MobileLogoutModal = ({onClose}) =>{

    const navigate = useNavigate();

    const {logout} = useAuthStore();

    const handleLogout = () =>{
        logout();
        localStorage.removeItem('reactCardLogin');
        localStorage.removeItem('token');
        localStorage.removeItem('wishlist');
        navigate('/');
    }

    return(
        <div 
            className={cls.modalLogoutWrapper} 
            onClick={onClose}
        >
            <div 
                className={cls.modalLogoutInner}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={cls.top}>
                    <button onClick={onClose}>
                        <BlackCloseIcon />
                    </button>
                </div>
                <div className={cls.bottom}>
                    <h4>Потвердите выход</h4>
                    <p>Вы уверенны, что хотите выйти из профиля?</p>
                    <div className={cls.mobileModalButtonsList}>
                        <button 
                            onClick={handleLogout}
                        >
                            <p>Выйти</p>
                        </button>
                        <button onClick={onClose}>
                            <p>Отмена</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}