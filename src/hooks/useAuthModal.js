import { useContext } from "react"
import { AuthModalContext } from "../auth/AuthModalProvider";

export const useAuthModal = () =>{
    return useContext(AuthModalContext);
}