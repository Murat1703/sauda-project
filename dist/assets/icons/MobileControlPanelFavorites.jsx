export const MobileControlPanelFavorites = ({isActive}) =>{
    return(
        isActive?(
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.5 4.5C14.8905 4.5 13.0083 6.32463 12 7.5C10.9917 6.32463 9.1095 4.5 7.5 4.5C4.651 4.5 3 6.72218 3 9.55041C3 14.25 12 19.5 12 19.5C12 19.5 21 14.25 21 9.75C21 6.92177 19.349 4.5 16.5 4.5Z" fill="black"/>
                <path d="M16.5 4.5C14.8905 4.5 13.0083 6.32463 12 7.5C10.9917 6.32463 9.1095 4.5 7.5 4.5C4.651 4.5 3 6.72218 3 9.55041C3 14.25 12 19.5 12 19.5C12 19.5 21 14.25 21 9.75C21 6.92177 19.349 4.5 16.5 4.5Z" fill="url(#paint0_linear_675_23420)"/>
                <path d="M7.5 4.5C9.1095 4.5 10.9917 6.32463 12 7.5V19.5C12 19.5 3.00048 14.2503 3 9.55078C3 6.72255 4.651 4.5 7.5 4.5Z" fill="black"/>
                <path d="M7.5 4.5C9.1095 4.5 10.9917 6.32463 12 7.5V19.5C12 19.5 3.00048 14.2503 3 9.55078C3 6.72255 4.651 4.5 7.5 4.5Z" fill="url(#paint1_linear_675_23420)"/>
                <defs>
                    <linearGradient id="paint0_linear_675_23420" x1="12" y1="4.5" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF5A00"/>
                    <stop offset="1" stopColor="#EB2B00"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_675_23420" x1="7.5" y1="4.5" x2="7.5" y2="19.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF5A00"/>
                    <stop offset="1" stopColor="#EB2B00"/>
                    </linearGradient>
                </defs>
            </svg>
        ): (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.5 4.5C14.8905 4.5 13.0083 6.32463 12 7.5C10.9917 6.32463 9.1095 4.5 7.5 4.5C4.651 4.5 3 6.72218 3 9.55041C3 14.25 12 19.5 12 19.5C12 19.5 21 14.25 21 9.75C21 6.92177 19.349 4.5 16.5 4.5Z" fill="#B8B8B8"/>
                <path d="M7.5 4.5C9.1095 4.5 10.9917 6.32463 12 7.5V19.5C12 19.5 3.00048 14.2503 3 9.55078C3 6.72255 4.651 4.5 7.5 4.5Z" fill="#757575"/>
            </svg>
        )
    )
}