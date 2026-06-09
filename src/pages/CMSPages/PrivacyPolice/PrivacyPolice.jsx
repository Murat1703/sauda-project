import { Title } from "../../../components/Title";
import { useLocation } from "react-router-dom";
import { usePage } from "../../../hooks/usePage";
import { useEffect } from "react";
import { TextInfo } from "../../../components/TextInfo";
import { Loader } from "../../../components/Loader";

export const PrivacyPolice = () =>{

    const {pathname} = useLocation();

    const {page, loadingPage, errLoadingPage, loadPage} = usePage();

    useEffect(()=>{
        loadPage(pathname.slice(1))
    },[])


    return(
        <>
        {loadingPage && <Loader />}
        {errLoadingPage && <p>{errLoadingPage}</p>}
        {!loadingPage && 
        <>
            <Title >Политика конфиденциальности</Title>            
            <TextInfo html={page?.page?.body}/>
        </>
        }
        </>        
    )
}