import cls from './MobileLogoutModal.module.css'
import { useAuth } from '../../hooks/useAuth'

export const MobileLogoutModal = ({onClose}) =>{

    const {setIsAuth} = useAuth();

    return(
        <div className={cls.modalLogoutWrapper} onClick={onClose}>
            <div className={cls.modalLogoutInner}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={cls.top}>
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#152429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className={cls.bottom}>
                    <h4>Потвердите выход</h4>
                    <p>Вы уверенны, что хотите выйти из профиля?</p>
                    <div className={cls.mobileModalButtonsList}>
                        <button 
                            onClick={()=>{
                                onClose();
                                setIsAuth(false)
                            }}
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