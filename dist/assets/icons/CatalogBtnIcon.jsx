export const CatalogBtnIcon = ({isActive}) =>{
    return(
        !isActive ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.49988 10H13.3332M2.49988 5H17.4999M2.49988 15H9.16654" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>):
        (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 19C5.02943 19 1 14.9705 1 10C1 5.02943 5.02943 1 10 1C14.9705 1 19 5.02943 19 10C19 14.9705 14.9705 19 10 19ZM10 8.72722L7.45441 6.18162L6.18162 7.45441L8.72722 10L6.18162 12.5456L7.45441 13.8183L10 11.2728L12.5456 13.8183L13.8183 12.5456L11.2728 10L13.8183 7.45441L12.5456 6.18162L10 8.72722Z" fill="white"/>
        </svg>
        )
    )
}