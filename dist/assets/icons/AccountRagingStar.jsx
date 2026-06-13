export const AccountRatingStar = ({fill = false}) =>{

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7.00019 10.6517L2.88567 12.9548L3.80462 8.32996L0.342773 5.12857L5.02521 4.57339L7.00019 0.291687L8.97512 4.57339L13.6575 5.12857L10.1957 8.32996L11.1147 12.9548L7.00019 10.6517Z" fill={`${fill ==true? "#FF4D00": "#CFD0D1"}`}/>
        </svg>
    )
}