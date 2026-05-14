
export const useDateFormat = () =>{

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',

        });
    };

    return {formatDate}

}
