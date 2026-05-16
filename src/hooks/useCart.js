// import { create } from 'zustand';

// export const useCart = create((set, get) => ({
//   cartItems: JSON.parse(localStorage.getItem('basket')) || [],

//   toggleCart: (productId) => {
//     const current = get().cartItems;

//     const updated = current.includes(productId)
//       ? current.filter((id) => id !== productId)
//       : [...current, productId];

//     localStorage.setItem(
//       'basket',
//       JSON.stringify(updated)
//     );

//     set({ cartItems: updated });
//   },
// }));

import { create } from 'zustand';

export const useCart = create((set, get) => ({
    cartItems: JSON.parse(localStorage.getItem('basket')) || [],

    addToCart: (productId) => {
        const current = get().cartItems;

        const existingItem = current.find(
            item => item.id === productId
        );

        let updated;

        if(existingItem){
            updated = current.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );
        }else{
            updated = [
                ...current,
                {
                    id: productId,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem(
            'basket',
            JSON.stringify(updated)
        );

        set({ cartItems: updated });
    },

    removeFromCart: (productId) => {
        const current = get().cartItems;

        const updated = current.filter(
            item => item.id !== productId
        );

        localStorage.setItem(
            'basket',
            JSON.stringify(updated)
        );

        set({ cartItems: updated });
    },

    increaseQuantity: (productId) => {
        const updated = get().cartItems.map(item =>
            item.id === productId
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
        );

        localStorage.setItem(
            'basket',
            JSON.stringify(updated)
        );

        set({ cartItems: updated });
    },

    decreaseQuantity: (productId) => {
        const updated = get().cartItems
            .map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: (item.quantity > 1) && item.quantity - 1
                    }
                    : item
            )
            .filter(item => item.quantity > 0);

        localStorage.setItem(
            'basket',
            JSON.stringify(updated)
        );

        set({ cartItems: updated });
    }
}));