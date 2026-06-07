import cls from './TextInfo.module.css'
import DOMPurify from 'dompurify';

export const TextInfo = ({html}) =>{
    if (!html) return null; 
    return(
        <div 
            className={cls.textInfoData}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
            }}
        />
    )
}