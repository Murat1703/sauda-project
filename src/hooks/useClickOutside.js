import { useEffect } from 'react'

export const useClickOutside = (ref, callback, active = true) => {
    useEffect(() => {
        if (!active) return

        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleClick)
        document.addEventListener('touchstart', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('touchstart', handleClick)
        }
    }, [ref, callback, active])
}