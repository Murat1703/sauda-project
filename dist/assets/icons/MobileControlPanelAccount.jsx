export const MobileControlPanelAccount = ({isActive}) =>{
    return(
        isActive?(
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" fill="black"/>
                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" fill="url(#paint0_linear_675_19161)"/>
                <path d="M3.00065 20.1992C3.38826 15.4265 7.26191 13 11.9833 13C16.7712 13 20.7049 15.2932 20.9979 20.2C21.0096 20.3955 20.9979 21 20.2467 21C16.5411 21 11.0347 21 3.7275 21C3.47671 21 2.97954 20.4592 3.00065 20.1992Z" fill="black"/>
                <path d="M3.00065 20.1992C3.38826 15.4265 7.26191 13 11.9833 13C16.7712 13 20.7049 15.2932 20.9979 20.2C21.0096 20.3955 20.9979 21 20.2467 21C16.5411 21 11.0347 21 3.7275 21C3.47671 21 2.97954 20.4592 3.00065 20.1992Z" fill="url(#paint1_linear_675_19161)"/>
                <defs>
                    <linearGradient id="paint0_linear_675_19161" x1="12" y1="3" x2="12" y2="11" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF5A00"/>
                    <stop offset="1" stopColor="#EB2B00"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_675_19161" x1="12" y1="13" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF5A00"/>
                    <stop offset="1" stopColor="#EB2B00"/>
                    </linearGradient>
                </defs>
            </svg>
        ):(
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" fill="#757575"/>
                <path d="M3.00065 20.1992C3.38826 15.4265 7.26191 13 11.9833 13C16.7712 13 20.7049 15.2932 20.9979 20.2C21.0096 20.3955 20.9979 21 20.2467 21C16.5411 21 11.0347 21 3.7275 21C3.47671 21 2.97954 20.4592 3.00065 20.1992Z" fill="#B8B8B8"/>
            </svg>
        )
    )
}