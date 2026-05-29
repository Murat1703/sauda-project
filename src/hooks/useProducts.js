import { useState, useEffect, useCallback } from "react"


const productsList = {
    products: [
  {
    id: 1,
    title: "Цемент М500",
    description: "Портландцемент для кладочных, штукатурных и бетонных работ.",
    oldPrice: 3200,
    finalPrice: 2880,
    hasDiscount: true,
    discountPercent: 10,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Стройматериалы",
    brand: "Alit"
  },
  {
    id: 2,
    title: "Газоблок D500",
    description: "Газобетонный блок для строительства наружных и внутренних стен.",
    oldPrice: null,
    finalPrice: 780,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Стеновые материалы",
    brand: "StoneBlock"
  },
  {
    id: 3,
    title: "Клей для плитки CM11",
    description: "Сухая клеевая смесь для укладки керамической плитки.",
    oldPrice: 3300,
    finalPrice: 2800,
    hasDiscount: true,
    discountPercent: 15,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Сухие смеси",
    brand: "Ceresit"
  },
  {
    id: 4,
    title: "Грунтовка глубокого проникновения",
    description: "Укрепляет основание и улучшает сцепление отделочных материалов.",
    oldPrice: null,
    finalPrice: 5400,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Лакокрасочные материалы",
    brand: "Knauf"
  },
  {
    id: 5,
    title: "Шпаклевка финишная",
    description: "Готовая финишная шпаклевка для стен и потолков.",
    oldPrice: 8000,
    finalPrice: 7600,
    hasDiscount: true,
    discountPercent: 5,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Сухие смеси",
    brand: "Sheetrock"
  },
  {
    id: 6,
    title: "Металлочерепица Monterrey",
    description: "Кровельный материал с полимерным покрытием для частных домов.",
    oldPrice: 13600,
    finalPrice: 12500,
    hasDiscount: true,
    discountPercent: 8,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Кровля",
    brand: "Grand Line"
  },
  {
    id: 7,
    title: "Минеральная вата",
    description: "Тепло- и звукоизоляционный материал для стен, кровли и перекрытий.",
    oldPrice: null,
    finalPrice: 8900,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Утеплители",
    brand: "Технониколь"
  },
  {
    id: 8,
    title: "Профиль направляющий ПН 50",
    description: "Металлический профиль для монтажа гипсокартонных перегородок.",
    oldPrice: null,
    finalPrice: 1200,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Гипсокартонные системы",
    brand: "Knauf"
  },
  {
    id: 9,
    title: "Гипсокартон влагостойкий",
    description: "Листовой материал для помещений с повышенной влажностью.",
    oldPrice: 4200,
    finalPrice: 3696,
    hasDiscount: true,
    discountPercent: 12,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Гипсокартонные системы",
    brand: "Gyproc"
  },
  {
    id: 10,
    title: "Саморезы по металлу",
    description: "Саморезы для крепления гипсокартона к металлическому профилю.",
    oldPrice: null,
    finalPrice: 950,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Крепеж",
    brand: "FixPro"
  },
  {
    id: 11,
    title: "Кирпич керамический рядовой",
    description: "Прочный строительный кирпич для кладки стен и перегородок.",
    oldPrice: 180,
    finalPrice: 167,
    hasDiscount: true,
    discountPercent: 7,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Стеновые материалы",
    brand: "Kerama"
  },
  {
    id: 12,
    title: "Пена монтажная профессиональная",
    description: "Полиуретановая пена для заполнения швов и пустот.",
    oldPrice: null,
    finalPrice: 3100,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Герметики и пены",
    brand: "Soudal"
  },
  {
    id: 13,
    title: "Герметик силиконовый",
    description: "Влагостойкий санитарный герметик для ванной и кухни.",
    oldPrice: 2400,
    finalPrice: 2160,
    hasDiscount: true,
    discountPercent: 10,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Герметики и пены",
    brand: "Makroflex"
  },
  {
    id: 14,
    title: "Краска интерьерная",
    description: "Матовая краска для внутренних отделочных работ.",
    oldPrice: 14500,
    finalPrice: 11600,
    hasDiscount: true,
    discountPercent: 20,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Лакокрасочные материалы",
    brand: "Dulux"
  },
  {
    id: 15,
    title: "Валик малярный",
    description: "Валик для покраски стен и потолков.",
    oldPrice: null,
    finalPrice: 1900,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Инструменты",
    brand: "Matrix"
  },
  {
    id: 16,
    title: "Кисть плоская",
    description: "Универсальная кисть для лакокрасочных работ.",
    oldPrice: null,
    finalPrice: 850,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Инструменты",
    brand: "Stayer"
  },
  {
    id: 17,
    title: "Перфоратор SDS-Plus",
    description: "Мощный перфоратор для бурения и демонтажных работ.",
    oldPrice: 46500,
    finalPrice: 39525,
    hasDiscount: true,
    discountPercent: 15,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Электроинструменты",
    brand: "Bosch"
  },
  {
    id: 18,
    title: "Шуруповерт аккумуляторный",
    description: "Компактный шуруповерт для монтажа и сборки.",
    oldPrice: 38900,
    finalPrice: 35010,
    hasDiscount: true,
    discountPercent: 10,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Электроинструменты",
    brand: "Makita"
  },
  {
    id: 19,
    title: "Уровень строительный",
    description: "Алюминиевый уровень длиной 100 см.",
    oldPrice: null,
    finalPrice: 6200,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Измерительный инструмент",
    brand: "Stanley"
  },
  {
    id: 20,
    title: "Рулетка 5 метров",
    description: "Компактная рулетка с фиксатором.",
    oldPrice: null,
    finalPrice: 2100,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Измерительный инструмент",
    brand: "Gross"
  },
  {
    id: 21,
    title: "Ламинат дуб натуральный",
    description: "Износостойкий ламинат 33 класса.",
    oldPrice: 6900,
    finalPrice: 5658,
    hasDiscount: true,
    discountPercent: 18,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Напольные покрытия",
    brand: "Kronospan"
  },
  {
    id: 22,
    title: "Подложка под ламинат",
    description: "Подложка для шумоизоляции пола.",
    oldPrice: null,
    finalPrice: 1300,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Напольные покрытия",
    brand: "SolidFloor"
  },
  {
    id: 23,
    title: "Плитка керамическая",
    description: "Белая настенная плитка для ванной комнаты.",
    oldPrice: 5800,
    finalPrice: 5220,
    hasDiscount: true,
    discountPercent: 10,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Плитка",
    brand: "Kerama Marazzi"
  },
  {
    id: 24,
    title: "Керамогранит серый",
    description: "Прочный напольный керамогранит.",
    oldPrice: null,
    finalPrice: 8200,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Плитка",
    brand: "Estima"
  },
  {
    id: 25,
    title: "Затирка для швов",
    description: "Затирка для плиточных швов.",
    oldPrice: 1700,
    finalPrice: 1598,
    hasDiscount: true,
    discountPercent: 6,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Плитка",
    brand: "Ceresit"
  },
  {
    id: 26,
    title: "Труба полипропиленовая",
    description: "Труба для систем водоснабжения.",
    oldPrice: null,
    finalPrice: 650,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Сантехника",
    brand: "Valtec"
  },
  {
    id: 27,
    title: "Смеситель для кухни",
    description: "Однорычажный кухонный смеситель.",
    oldPrice: 24500,
    finalPrice: 21560,
    hasDiscount: true,
    discountPercent: 12,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Сантехника",
    brand: "Grohe"
  },
  {
    id: 28,
    title: "Радиатор алюминиевый",
    description: "Современный радиатор отопления.",
    oldPrice: 56000,
    finalPrice: 50960,
    hasDiscount: true,
    discountPercent: 9,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Отопление",
    brand: "Royal Thermo"
  },
  {
    id: 29,
    title: "Автоматический выключатель",
    description: "Автомат для защиты электрических цепей.",
    oldPrice: null,
    finalPrice: 2300,
    hasDiscount: false,
    discountPercent: 0,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Электрика",
    brand: "Schneider Electric"
  },
  {
    id: 30,
    title: "Кабель ВВГнг 3x2.5",
    description: "Силовой медный кабель для проводки.",
    oldPrice: 780,
    finalPrice: 741,
    hasDiscount: true,
    discountPercent: 5,
    image: "https://swiperjs.com/demos/images/abstract-1.jpg",
    category: "Электрика",
    brand: "KazCable"
  }
    ],
    pagination: {
        page: 1,
        limit: 4,
        totalItems: 24,
        totalPages: 6,
        hasNextPage: true,
        hasPrevPage: false
    }
};

const getProducts = () =>{
    return productsList.products
}

const getProduct = (id) =>{
    return productsList.products.find(product => product.id === Number(id));
}

export const useProducts = () =>{
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const loadProducts = useCallback(async () => {
        try {
        setLoadingProducts(true);
        const res = await getProducts();
        setProducts(res || []);
        } catch (error) {
        console.error("Failed to load products:", error);
        throw error;
        } finally {
        setLoadingProducts(false);
        }
    }, []);

    const [product, setProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const loadProduct = useCallback(async(id)=>{
        try {
        setLoadingProduct(true);
        const res = await getProduct(id);
        setProduct(res || []);
        } catch (error) {
        console.error("Failed to load product:", error);
        throw error;
        } finally {
        setLoadingProduct(false);
        }
    },[])

    const [productsArrByIds, setProductsArrByIds] = useState(null)
    const [loadingProductsByIds, setLoadingProductsByIds] = useState(false)

    // const loadProductsByIds = async (ids) => {
    //     const result = await Promise.all(
    //         ids.map(id => getProduct(id))
    //     );

    //     setProductsArrById(result);
    // };

    const loadProductsByIds = useCallback(async(ids)=>{
        try {
            setLoadingProductsByIds(true);
            const res = await Promise.all(
                ids.map(id => getProduct(id))
            );
            setProductsArrByIds(res || []);
        } catch (error) {
            console.error("Failed to load products:", error);
            throw error;
        } finally {
            setLoadingProductsByIds(false);
        }
    },[])

    const loadCartProducts = useCallback(async(cartItems) => {
        try {
            setLoadingProductsByIds(true);

            const res = await Promise.all(
                cartItems.map(async (cartItem) => {
                    const product = await getProduct(cartItem.id);

                    return {
                        ...product,
                        quantity: cartItem.quantity
                    };
                })
            );

            setProductsArrByIds(res || []);
        } catch (error) {
            console.error("Failed to load cart products:", error);
            throw error;
        } finally {
            setLoadingProductsByIds(false);
        }
    }, []);

    

    return {products, loadingProducts, loadProducts, product, loadingProduct, loadProduct, loadProductsByIds, productsArrByIds, loadingProductsByIds, loadCartProducts}
}