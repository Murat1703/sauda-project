
export const usePriceFormat = () =>{
    const formatPrice = (price) => {
        return Number(price).toLocaleString('ru-RU', {
            maximumFractionDigits: 0,
        });
    };

    return formatPrice
}