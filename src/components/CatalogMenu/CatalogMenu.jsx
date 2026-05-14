import { useState } from 'react';
import cls from './CatalogMenu.module.css'
import buildIcon from './icons/build.svg'
import electroIcon from './icons/electro.svg'
import handToolsIcon from './icons/handTools.svg'
import electricityIcon from './icons/electricity.svg'
import engineerIcon from './icons/engineer.svg'
import finishingIcon from './icons/finishing.svg'
import homeIcon from './icons/home.svg'
import pumblingIcon from './icons/plumbing.svg'
import fastenersIcon from './icons/fasteners.svg'
import workWearIcon from './icons/workwear.svg'
import cleaningIcon from './icons/cleaning.svg'
import gardenIcon from './icons/garden.svg'

export const Menu = [
  {
    id: 'building-materials',
    title: 'Стройматериалы',
    icon: buildIcon,
    children: [
      {
        id: 'wall-facade',
        title: 'Стеновые и фасадные материалы',
        children: [
          { id: '1', title: 'Кирпичи', count: 60 },
          { id: '2', title: 'Бетонные блоки', count: 16 },
          { id: '3', title: 'Газоблок', count: 45 },
          { id: '4', title: 'Гипсокартон', count: 32 },
          { id: '5', title: 'Потолочные панели', count: 50 },
          { id: '6', title: 'Кровельные материалы', count: 90 },
          { id: '7', title: 'Теплоизоляция', count: 27 },
          { id: '8', title: 'Сэндвич панели', count: 35 },
          { id: '9', title: 'Фасадные панели', count: 70 },
          { id: '10', title: 'Клинкер', count: 25 },
        ],
      },
      {
        id: 'fences',
        title: 'Заборы и ограждения',
        children: [
          { id: '11', title: 'Ленты заборные', count: 60 },
          { id: '12', title: 'Ворота и калитки', count: 150 },
          { id: '13', title: 'Секционные заборы', count: 200 },
          { id: '14', title: 'Евроштакетник', count: 120 },
          { id: '15', title: 'Профнастил', count: 95 },
          { id: '16', title: 'Сетки', count: 130 },
        ],
      },
      {
        id: 'wood',
        title: 'Древесно-плитные материалы',
        children: [
          { id: '17', title: 'ДВП', count: 63 },
          { id: '18', title: 'ДСП', count: 13 },
          { id: '19', title: 'ЛДСП', count: 3 },
          { id: '20', title: 'МДВП', count: 16 },
          { id: '21', title: 'МДФ-37', count: 21 },
          { id: '22', title: 'Мебельные щиты', count: 104 },
        ],
      },
      {
        id: 'dry-mixes',
        title: 'Сухие строительные смеси',
        children: [
          { id: '23', title: 'Цементно-песчаные смеси', count: 85 },
          { id: '24', title: 'Ровнители для пола', count: 50 },
          { id: '25', title: 'Штукатурки', count: 75 },
          { id: '26', title: 'Шпаклевки', count: 40 },
          { id: '27', title: 'Кладочные и монтажные смеси', count: 95 },
          { id: '28', title: 'Смеси для печей и каминов', count: 30 },
          { id: '29', title: 'Смеси для фасадов', count: 70 },
          { id: '30', title: 'Ремонтные составы', count: 55 },
        ],
      },
      {
        id: 'paving-slabs',
        title: 'Тротуарная плитка, бордюры и решетки',
        children: [
          { id: '36', title: 'Плитка тротуарная', count: 90 },
          { id: '37', title: 'Клинкер тротуарный', count: 75 },
          { id: '38', title: 'Ступени для уличных лестниц', count: 80 },
          { id: '39', title: 'Решетки газонные', count: 70 },
          { id: '40', title: 'Уличная тактиильная плитка', count: 65 },
          { id: '41', title: 'Бордюрный камень', count: 88 },
        ],
      },
      {
        id: 'roof',
        title: 'Кровля, водосточные системы',
        children: [
          { id: '42', title: 'Водосточные системы ', count: 60 },
          { id: '43', title: 'Металлочерепица', count: 150 },
          { id: '44', title: 'Колпаки для заборных столбов', count: 75 },
        ],
      },
      {
        id: 'metall',
        title: 'Металлопрокат',
        children: [
          { id: '45', title: 'Арматура ', count: 100 },
          { id: '46', title: 'Сетки армирующие', count: 150 },
          { id: '47', title: 'Уголок стальной', count: 75 },
          { id: '48', title: 'Трубы ВГП', count: 250 },
          { id: '49', title: 'Трубы стальные', count: 300 },
          { id: '50', title: 'Полоса стальная', count: 350 },
          { id: '51', title: 'Квадрат стальной', count: 400 },
          { id: '52', title: 'Двутавр', count: 500 },
          { id: '52', title: 'Швеллер стальной', count: 450 },
        ],
      },
    ],
  },

  {
    id: 'power-tools',
    title: 'Электроинструменты',
    icon: electroIcon,
    children: [
      {
        id: 'drills',
        title: 'Дрели и перфораторы',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `pt-drill-${i}`,
          title: `Дрель модель ${i + 1}`,
          count: 20 + i * 5,
        })),
      },
      {
        id: 'grinders',
        title: 'Шлифовальные инструменты',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `pt-grind-${i}`,
          title: `Шлифмашина ${i + 1}`,
          count: 15 + i * 4,
        })),
      },
    ],
  },

  {
    id: 'hand-tools',
    title: 'Ручные инструменты',
    icon: handToolsIcon,
    children: [
      {
        id: 'tools',
        title: 'Инструменты',
        children: Array.from({ length: 15 }, (_, i) => ({
          id: `ht-${i}`,
          title: `Инструмент ${i + 1}`,
          count: 10 + i * 3,
        })),
      },
    ],
  },

  {
    id: 'electricity',
    title: 'Электрика',
    icon: electricityIcon,
    children: [
      {
        id: 'cables',
        title: 'Кабели и проводка',
        children: Array.from({ length: 15 }, (_, i) => ({
          id: `el-${i}`,
          title: `Кабель ${i + 1}`,
          count: 30 + i * 7,
        })),
      },
    ],
  },

  {
    id: 'engineering',
    title: 'Инженерные системы',
    icon: engineerIcon,
    children: [
      {
        id: 'systems',
        title: 'Системы',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `eng-${i}`,
          title: `Система ${i + 1}`,
          count: 20 + i * 6,
        })),
      },
    ],
  },

  {
    id: 'finishing',
    title: 'Финишная отделка',
    icon: finishingIcon,
    children: [
      {
        id: 'finish',
        title: 'Отделка',
        children: Array.from({ length: 14 }, (_, i) => ({
          id: `fin-${i}`,
          title: `Материал ${i + 1}`,
          count: 25 + i * 4,
        })),
      },
    ],
  },

  {
    id: 'home',
    title: 'Товары для дома',
    icon: homeIcon,
    children: [
      {
        id: 'home-items',
        title: 'Дом',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `home-${i}`,
          title: `Товар ${i + 1}`,
          count: 18 + i * 5,
        })),
      },
    ],
  },

  {
    id: 'plumbing',
    title: 'Сантехника',
    icon: pumblingIcon,
    children: [
      {
        id: 'plumb',
        title: 'Сантехника',
        children: Array.from({ length: 15 }, (_, i) => ({
          id: `pl-${i}`,
          title: `Сантехника ${i + 1}`,
          count: 22 + i * 6,
        })),
      },
    ],
  },

  {
    id: 'fasteners',
    title: 'Крепеж и фурнитура',
    icon: fastenersIcon,
    children: [
      {
        id: 'fix',
        title: 'Крепеж',
        children: Array.from({ length: 15 }, (_, i) => ({
          id: `fix-${i}`,
          title: `Крепеж ${i + 1}`,
          count: 50 + i * 10,
        })),
      },
    ],
  },

  {
    id: 'workwear',
    title: 'Спецодежда',
    icon: workWearIcon,
    children: [
      {
        id: 'wear',
        title: 'Одежда',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `wear-${i}`,
          title: `Одежда ${i + 1}`,
          count: 12 + i * 4,
        })),
      },
    ],
  },

  {
    id: 'cleaning',
    title: 'Клининг и химия',
    icon: cleaningIcon,
    children: [
      {
        id: 'clean',
        title: 'Химия',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `clean-${i}`,
          title: `Средство ${i + 1}`,
          count: 20 + i * 3,
        })),
      },
    ],
  },

  {
    id: 'garden',
    title: 'Сад и досуг',
    icon: gardenIcon,
    children: [
      {
        id: 'garden-items',
        title: 'Сад',
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `garden-${i}`,
          title: `Садовый товар ${i + 1}`,
          count: 15 + i * 5,
        })),
      },
    ],
  },
];

export const CatalogMenu = () =>{

    const [activeID, setActiveID] = useState(Menu[0].id);

    const activeCategory = Menu.find(cat => cat.id === activeID);

    const chunkByPattern = (arr, pattern) => {
        let result = [];
        let index = 0;

        pattern.forEach(size => {
            result.push(arr.slice(index, index + size));
            index += size;
        });

        return result;
    };

    const columns = chunkByPattern(activeCategory.children, [2, 3, 2]);

    console.log(activeCategory)

    console.log(columns)


    return(
        <>
        <div className={cls.catalogMenuWrapper}>
            <div className={cls.catalogMenuInner}>
                <div className={cls.catalogMenuLeft}>
                    <ul>
                        {Menu.map((item, index)=>(
                            <li key={item.id} onMouseEnter={()=>setActiveID(item.id)} className={item.id == activeID ? `${cls.activeItem}`: ""}>
                                <a href="" onClick={(e)=>e.preventDefault()}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20.6186 17.2753C20.6186 17.6062 20.5469 17.9331 20.4083 18.2335C20.2698 18.534 20.0677 18.8008 19.8161 19.0156L17.4915 21H5.66948C4.40578 21 3.38135 19.9756 3.38135 18.7119V14.6695C3.38135 10.0551 5.20476 6.85173 5.20476 6.85173" stroke="#152429" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.5678 20.6187V15.8136C17.5678 13.0678 18.1591 10.5634 18.6764 8.89755C19.2531 7.04066 19.337 5.06417 18.8956 3.17052C18.8853 3.12638 18.8749 3.08227 18.8644 3.03819C18.8644 3.03819 20.6187 8.11021 20.6187 12.0763V13.5254" stroke="#152429" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.6187 6.81348H16.4237C17.0525 5.35331 17.5297 4.10586 18.7119 2.99993" stroke="#152429" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18.75 2.99993H5.28813C4.10501 4.21244 3.44008 5.46607 3 6.81348H8.07202" stroke="#152429" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13.7542 3.03812C13.7542 3.03812 10.8559 6.05083 10.7415 9.86438H7.69067C7.91949 5.5932 10.5508 3.03812 10.5508 3.03812" stroke="#152429" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> */}
                                    <img src={item.icon} alt='icon'/>
                                    <p>{item.title}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.266533 11.5534C-0.0888443 11.198 -0.0888444 10.6219 0.266533 10.2665L4.62307 5.90995L0.266532 1.55341C-0.0888448 1.19804 -0.0888448 0.621857 0.266532 0.266479C0.621909 -0.0888977 1.19809 -0.0888978 1.55347 0.266479L6.55347 5.26648C6.90884 5.62186 6.90884 6.19804 6.55347 6.55341L1.55347 11.5534C1.19809 11.9088 0.62191 11.9088 0.266533 11.5534Z" fill="#8F9596"/>
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <nav className={cls.catalogMenuRight}>
                    <h4 className={cls.activeCategoryTitle}>{activeCategory.title}</h4>
                    <ul>
                        {/* {columns.map((subCategory, index)=>{

                            return(
                            <div >
                                <div key={subCategory.id}>
                                        <h5>{subCategory.title}</h5>
                                        {subCategory.children.map((subChidlren, index)=>(
                                            <li>
                                                <a href=""><p>{subChidlren.title}</p><span>{subChidlren.count}</span></a>
                                            </li>
                                        ))}
                                </div>
                            </div>

                            )
                        })} */}
                        {columns.map((column, columnIndex) => (
                        <div className={cls.column} key={columnIndex}>
                            {column.map((category) => (
                            <div className={cls.group} key={category.id}>
                                <h4>{category.title}</h4>

                                {category.children?.map((child) => (
                                <div className={cls.item} key={child.id}>
                                    {/* {child.title} */}
                                    <li>
                                        <a href="">
                                            <p>{child.title}</p>
                                            <span>
                                                {child.count}
                                            </span>
                                        </a>
                                    </li>
                                </div>
                                ))}
                            </div>
                            ))}
                        </div>
                        ))}
                    </ul>


                </nav>
            </div>
        </div>
        <div className={cls.bg}></div>
        </>
    )
}