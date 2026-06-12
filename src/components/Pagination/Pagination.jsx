
// import { useEffect, useState } from 'react';
// import cls from './Pagination.module.css';

// export const Pagination = ({ links = [], setActivePage }) => {
//   const [page, setPage] = useState(1);

//   console.log(links)



//   return (
//     <div className={cls.paginationWrapper}>
//       {links.map((item)=>{
//         return(
//             <button 
//                 className={item.active==true ? cls.activePage: ""}
//                 onClick={()=>setActivePage(Number(item.label))}
//             >
//                 {item.label}
//             </button>
//         )
//       })}
//     </div>
//   );
// };


import cls from './Pagination.module.css';

export const Pagination = ({ links = [], setActivePage }) => {
  const numericLinks = links.filter((item) => {
    return Number.isInteger(Number(item.label));
  });

  const currentPage =
    Number(numericLinks.find((item) => item.active)?.label) || 1;

  const lastPage =
    Number(numericLinks[numericLinks.length - 1]?.label) || 1;

  const getPaginationItems = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'dots-right', lastPage];
    }

    if (currentPage >= lastPage - 2) {
      return [1, 'dots-left', lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      1,
      'dots-left',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'dots-right',
      lastPage,
    ];
  };

  const paginationItems = getPaginationItems();

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    setActivePage(page);
  };

  return (
    <div className={cls.paginationWrapper}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Назад
      </button>

      {paginationItems.map((item) => {
        if (item === 'dots-right') {
          return (
            <button
              key="dots-right"
              type="button"
              className={cls.dots}
              onClick={() => goToPage(Math.min(currentPage + 3, lastPage))}
            >
              ...
            </button>
          );
        }

        if (item === 'dots-left') {
          return (
            <button
              key="dots-left"
              type="button"
              className={cls.dots}
              onClick={() => goToPage(Math.max(currentPage - 3, 1))}
            >
              ...
            </button>
          );
        }

        return (
          <button
            key={item}
            type="button"
            className={item === currentPage ? cls.activePage : ''}
            onClick={() => goToPage(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === lastPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};