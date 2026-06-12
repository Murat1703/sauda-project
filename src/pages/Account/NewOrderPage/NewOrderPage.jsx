import cls from './NewOrderPage.module.css'
import { Link } from 'react-router-dom'
import { Title } from '../../../components/Title'
import { ArrowOrderPageIcon } from '../../../../public/assets/icons/ArrowOrderPageIcon'
import { useCart } from '../../../stores/useCart'
// import { useAuth } from '../../../context/AuthContext'
import { NewOrderCheckIcon } from '../../../../public/assets/icons/NewOrderCheckIcon'
import { useEffect, useState } from 'react'
import { LocationIcon } from '../../../../public/assets/icons/LocationIcon'
import { OrderListArrow } from '../../../../public/assets/icons/OrderListArrow'
import { usePickupPoints } from '../../../hooks/usePickupPoints'
import { MobileCheckIcon } from '../../../../public/assets/icons/MobileCheckIcon'
import { EmtpyWhiteHeartIcon } from '../../../../public/assets/icons/EmtpyWhiteHeartIcon'
import { PaymentCardIcon } from '../../../../public/assets/icons/PaymentCardIcon'
import { PaymentKaspiIcon } from '../../../../public/assets/icons/PaymentKaspiIcon'
import kaspiIcon from '../../../../public/assets/icons/kaspi.svg'
import { PaymentCashIcon } from '../../../../public/assets/icons/PaymentCashIcon'
import { useOrdersStore } from '../../../stores/useOrdersStore'
import { PickupIconDelivery } from '../../../../public/assets/icons/PickupIconDelivery'
import { useMediaQuery } from 'react-responsive'
import { useAuthStore } from '../../../stores/useAuthStore'
import { useMask } from '@react-input/mask'
import { useLogin } from '../../../hooks/useLogin'
import { useAuthModal } from '../../../context/AuthModalContext'
import { AuthModal } from '../../../components/AuthModal'
import { useAuth } from '../../../context/AuthContext'
import { EmptyResults } from '../../../components/EmptyResults'

export const NewOrderPage = () =>{

    const {cartTotal} = useCart();

    const {user, isAuth} = useAuth();

    const {orders, addOrder} = useOrdersStore();

    const [show, setShow] = useState(0);
    const [delivery, setDelivery] = useState('pickup')

    const citiesList = ["Астана", "Алматы", "Караганды", "Усть-Каменогорск", "Уральск", "Атырау", "Талдыкорган", "Семей"]

    useEffect(()=>{},[delivery])

    const [data, setData] = useState({
        delivery_method_code: null,
        payment_method_id: null,
        contact_phone: user?.user?.phone,
        contact_name: user?.user?.name
    })

    useEffect(()=>{
        if (!user?.user) return;
        setData((prev)=>({
            ...prev,
            contact_phone: user?.user?.phone,
            contact_name: user?.user?.name,
        }))
        setShow(1)

    },[user]);


    const [activeCity, setActiveCity] = useState(citiesList[0]);
    const [showList, setShowList] = useState(false);

    const {pickupPoints, loadingPoints, loadPoints, errLoadingPoints}= usePickupPoints();

    const localCityAdresses = pickupPoints.filter(
        item => item.city === activeCity
    );

    useEffect(()=>{
        loadPoints();
    },[])

    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const phoneMask = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const {
        login, 
        loading, 
        status, 
        verify, 
        verifyLoading, 
        verifyError,
        clearError,
        verifyStatus, 
        profile, 
        profileLoading, 
        profileError, 
        profileStatus
    } = useLogin();

    const kzCodes = [
        "700", "701", "702",
        "705", "706", "707", "708",
        "747",
        "771",
        "775", "776", "777", "778",
    ]; 

    const { setStep, openAuthModalOtp, setNewOrderPhone } = useAuthModal();

    const validate = async(phone) =>{
        let digits = phone.replace(/\D/g, "");
        const code = digits.slice(1,4)
        if (!kzCodes.includes(code))
            {
                setErrPhone('Номер не принадлежит сотовому оператору')
                return
            }
        if (digits.length < 11) {            
            setErrPhone('Проверьте длину введенного номера');
            return
        }
        if ((digits.length==11) && !errPhone) {
            const validNum = `+`+digits;
            console.log(validNum);
            setStep('otp');
            await login(validNum);
            openAuthModalOtp();
        }

    }

    const [errPhone, setErrPhone] = useState(null)

    const [phone, setPhone] = useState(null)

    const [orderStatus, setOrderStatus]= useState(null)

    const handleAddOrder = () =>{
        if (data.contact_name && data.contact_phone && data.delivery_method_code && data.payment_method_id) { 
            addOrder(data);
            setOrderStatus('send')
        } else window.alert('Проверьте все ли поля заполнены ')
    }

    return(
        <>
        <div className={cls.newOrderPage}>
            <div className={cls.newOrderPageTop}>
                <Link to={`/cart`}>
                    <ArrowOrderPageIcon />
                    <p>Вернутся в корзину</p>
                </Link>
                <Title>
                    Оформление заказа
                </Title>
            </div>
            {isMobile && 
            <div className={cls.mobileTotalOrderCount}>
                <span>{cartTotal?.items_quantity} товара</span>
                <span>{cartTotal?.subtotal}₸</span>
            </div>
            }
            {orderStatus == 'send' && <EmptyResults 
                icon={<EmtpyWhiteHeartIcon />}
                text={`Спасибо! Ваш заказ создан!`}
                description={`Проверяйте заказы в персональном разделе.Ознакомьтесь с нашим каталогом поближе`}    
                orders={`/account/orders`}        
            />}
            {!orderStatus &&
            <div className={cls.newOrderBody}>
                <div className={cls.newOrderContacts}>
                    <div 
                        className={cls.newOrderField} 
                        // onClick={()=>setShow(0)}
                    >
                        <div className={cls.newOrderFieldTitle}>
                            <div>
                                1
                            </div>
                            <p>Контактные данные</p>
                        </div>
                        <div className={cls.newOrderFieldContactInfo}>
                            {isAuth && 
                                <>
                                <div>
                                    <NewOrderCheckIcon />
                                </div>
                                <div>
                                    <p>{user?.user?.phone}</p>
                                    <p>{user?.user?.name}</p>
                                </div>
                                </>
                            }
                            {!isAuth && 
                            <>
                                <div className={cls.contactsInputsBlock}>
                                    <div className={cls.contactPhoneInput}>
                                        <p>Номер телефона</p>
                                        {errPhone && <span className={cls.errPhone}>{errPhone}</span>}
                                        <input 
                                            type="tel" 
                                            placeholder='+7 '
                                            ref={phoneMask}
                                            onChange={(e)=>{
                                                const value = e.target.value;
                                                setPhone(value);
                                                setNewOrderPhone(value)
                                                setErrPhone(null)
                                            }}
                                        />
                                    </div>
                                    <button 
                                        className={cls.sendPhoneBtn}
                                        onClick={()=>{
                                            validate(phone)
                                        }}
                                    >
                                        <p>Отправить</p>
                                    </button>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div 
                        className={cls.newOrderField} 
                    >
                        <div className={cls.newOrderFieldTitle}>
                            <div>
                                2
                            </div>
                            <p>Способ доставки</p>
                        </div>
                        {data.contact_name && data.contact_phone &&
                        <div className={cls.newOrderDeliveryMethod}>
                            <div className={cls.newOrderDeliveryMethodTop}>
                                <div 
                                    className={`${cls.pickup} ${delivery=='pickup'? cls.active: ""}`}
                                    onClick={()=>{
                                        const deliveryMethod = 'pickup';
                                        setDelivery(deliveryMethod);
                                        setData((prev)=>({
                                            ...prev,
                                            delivery_method_code: deliveryMethod
                                        }))
                                    }}
                                >
                                    <p>Самовывоз</p>
                                </div>
                                <div 
                                    className={`${cls.standart} ${delivery=='standard'? cls.active : ""}`}
                                    onClick={()=>{
                                        setDelivery('standard');
                                        const deliveryMethod = 'standard';
                                        setData((prev)=>({
                                            ...prev,
                                            delivery_method_code: deliveryMethod
                                        }))
                                    }}
                                >
                                    <p>Доставка до адреса</p>
                                </div>
                            </div>
                            <div className={cls.newOrderDeliveryMethodBody}>
                                {delivery=='pickup' && 
                                <div className={cls.pickupDeliveryInfo}>
                                    <div className={cls.pickupCityWrapper}>
                                        <p>Выберите город</p>
                                        <div className={cls.pickupCitiesListWrapper}
                                        onClick={()=>setShowList(!showList)}>
                                            <div className={cls.activeCity} >
                                                <LocationIcon />
                                                <p>{activeCity}</p>
                                            </div>
                                            <OrderListArrow />
                                            {showList && 
                                            <div className={cls.list}>
                                                <div>
                                                    {citiesList.map((city, index)=>{
                                                        return(
                                                            <p 
                                                            key={index}
                                                            onClick={()=>setActiveCity(city)}
                                                            >{city}</p>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className={cls.pickupPointsList}>
                                        <p>Пункты самовывоза</p>
                                        <div className={cls.pointsList}>
                                        {localCityAdresses.length == 0 &&<p>Пункт вывоза заказа отсутсвует</p>}
                                        {localCityAdresses?.map((item,index)=>{
                                            console.log(item)
                                            return(
                                                <div key={index} className={cls.pointItem}>
                                                    <div>
                                                        <MobileCheckIcon />
                                                    </div>
                                                    <div>
                                                        <p>{item?.address}</p>
                                                        <p>{item?.work_hours}</p>
                                                    </div>
                                                    <input 
                                                        type="radio" name='city'
                                                        value={item?.address}
                                                    />
                                                    <div></div>
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                </div>
                                }
                                {delivery=='standard' &&
                                <div className={cls.deliveryStandart}>
                                    <div className={cls.pickupCityWrapper}>
                                        <p>Выберите город</p>
                                        <div className={cls.pickupCitiesListWrapper}
                                        onClick={()=>setShowList(!showList)}>
                                            <div className={cls.activeCity} >
                                                <LocationIcon />
                                                <p>{activeCity}</p>
                                            </div>
                                            <OrderListArrow />
                                            {showList && 
                                            <div className={cls.list}>
                                                <div>
                                                    {citiesList.map((city, index)=>{
                                                        return(
                                                            <p 
                                                            key={index}
                                                            onClick={()=>{
                                                                setActiveCity(city);
                                                                const toDataCity = city; 
                                                                setData((prev)=>({
                                                                    ...prev,
                                                                    delivery_address: {
                                                                        ...prev.delivery_address,
                                                                        city: toDataCity
                                                                    }
                                                                }))
                                                            }}
                                                            >{city}
                                                            </p>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className={cls.deliveryAdressInputs}>
                                        <div>
                                            <p>Введите ваш адрес<span>*</span></p>
                                            <input 
                                                type="text" placeholder='Введите ваш адрес' 
                                                onChange={(e)=>{
                                                    setData((prev)=>({
                                                        ...prev,
                                                        delivery_address: {
                                                            ...prev.delivery_address,
                                                            street: e.target.value
                                                        }
                                                    }))
                                                }}
                                            />
                                            <span>Пример: ул.Макатаева 314</span>
                                        </div>
                                        <div>
                                            <div>
                                                <p>Этаж</p>
                                                <input 
                                                    type="text" placeholder='Этаж' 
                                                />
                                            </div>
                                            <div>
                                                <p>Квартира</p>
                                                <input 
                                                    type="text" placeholder='Квартира'
                                                    onChange={(e)=>{
                                                        setData((prev)=>({
                                                            ...prev,
                                                            delivery_address: {
                                                                ...prev.delivery_address,
                                                                apartment: e.target.value
                                                            }
                                                        }))
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className={cls.deliveryAdressInputs}>
                                        <div className={cls.notes}>
                                            <p>Комментарий для курьера</p>
                                            <input 
                                                type="text" 
                                                placeholder='Уточнения для курьера' 
                                            />
                                        </div>
                                    </div>
                                    <div className={cls.deliveryBtnWrapper}>
                                        <button onClick={()=>setShow(2)}>
                                            <p>Продолжить</p>
                                        </button>
                                        <div className={cls.deliveryInfo}>
                                            <PickupIconDelivery />
                                            <div>
                                                <p>Доставка до адреса</p>
                                                <p>1000₸</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        }
                    </div>
                    <div 
                        className={cls.newOrderField} 
                    >
                        <div className={cls.newOrderFieldTitle}>
                            <div>
                                3
                            </div>
                            <p>Способ оплаты</p>
                        </div>
                        {data.delivery_method_code && 
                        <>
                        <div className={cls.newOrderPayment}>
                            <div className={cls.newOrderPaymentItem}>
                                <div className={cls.newOrderLeft}>
                                    <PaymentCardIcon />
                                    <div>
                                        <p>Оплата картой</p>
                                        <p>Visa, Mastercard</p>
                                    </div>
                                </div>
                                <div></div>
                                <input 
                                    type="radio" 
                                    name='payment-method' 
                                    value={'card'}
                                    onChange={()=>setData((prev)=>(
                                        {
                                            ...prev,
                                            payment_method_id: 1
                                        }
                                    ))}
                                />
                            </div>
                            <div className={cls.newOrderPaymentItem}>
                                <div className={cls.newOrderLeft}>
                                    <img src={kaspiIcon} alt='kaspi'/>
                                    <div>
                                        <p>Kaspi.kz</p>
                                        <p>Оплата с помощью Kaspi Gold</p>
                                    </div>
                                </div>
                                <div></div>
                                <input 
                                    type="radio" 
                                    name='payment-method' 
                                    value={'kaspi'}
                                    onChange={()=>setData((prev)=>(
                                        {
                                            ...prev,
                                            payment_method_id: 3
                                        }
                                    ))}
                                />
                            </div>
                            <div className={cls.newOrderPaymentItem}>
                                <div className={cls.newOrderLeft}>
                                    <PaymentCashIcon />
                                    <div>
                                        <p>Наличными при получении</p>
                                        <p>Оплачивается при выдаче товара</p>
                                    </div>
                                </div>
                                <div></div>
                                <input 
                                    type="radio" 
                                    name='payment-method' 
                                    value={'cash'}
                                    onChange={()=>setData((prev)=>(
                                        {
                                            ...prev,
                                            payment_method_id: 4
                                        }
                                    ))}
                                />
                            </div>
                        </div>
                        <button 
                            className={cls.newOrderBtn}
                            onClick={handleAddOrder}
                        >
                            <p>Перейти к оплате</p>
                        </button>
                        </>

                        }
                    </div>
                </div>
                <div className={cls.newOrderDetails}>
                    <div className={cls.newOrderDetailsContent}>
                        <h4>Детали заказа</h4>
                        {cartTotal?.items?.length !== 0 &&
                        <div className={cls.newOrderDetailsList}>
                            {cartTotal?.items?.map((item, index)=>{
                                return(
                                    <div 
                                        className={cls.newOrderDetailItem} key={item?.product?.slug}
                                    >
                                        <div>
                                            <img src={`${item?.product?.primary_image_url}`} alt={`${item?.product?.name}`}/>
                                        </div>
                                        <Link to={`/products/${item?.product?.slug}`}>
                                            {item?.product?.name}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        }
                        <div className={cls.newOrderPriceBlock}>
                            <div className={cls.top}>
                                <div className={cls.newCharacteristicItem}>
                                    <span>Всего товаров</span>
                                    <div className={cls.line} ></div>
                                    <span>{cartTotal?.items_quantity} шт</span>
                                </div>
                                <div className={cls.newCharacteristicItem}>
                                    <span>Всего</span>
                                    <div className={cls.line}></div>
                                    <span>{cartTotal?.subtotal} ₸</span>
                                </div>
                                <div className={cls.newCharacteristicItem}>
                                    <span>Скидка</span>
                                    <div className={cls.line}></div>
                                    <span>{0} ₸</span>
                                </div>
                            </div>
                            <div className={cls.bottom}>
                                <span>Скидка</span>
                                <div className={cls.line}></div>
                                <span>{cartTotal?.subtotal} ₸</span>
                            </div>
                            <button 
                                className={cls.newOrderBtn}
                                onClick={()=>addOrder(data)}
                            >
                                <p>Перейти к оплате</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
        {/* {step == 'otp' && <AuthModal next={step}/>} */}
        </>
    )
}