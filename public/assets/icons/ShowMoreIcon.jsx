export const ShowMoreIcon = ({hide}) =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{transform: hide? "rotate(180deg": "none"}}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M3.47846 6.19672C3.76745 5.90773 4.23599 5.90773 4.52498 6.19672L8.00172 9.67346L11.4785 6.19672C11.7674 5.90773 12.236 5.90773 12.525 6.19672C12.814 6.48571 12.814 6.95425 12.525 7.24324L8.52498 11.2432C8.23599 11.5322 7.76745 11.5322 7.47846 11.2432L3.47846 7.24324C3.18947 6.95425 3.18947 6.48571 3.47846 6.19672Z" fill="#FF5302"/>
        </svg>
    )
}