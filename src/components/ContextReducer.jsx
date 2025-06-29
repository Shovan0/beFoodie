// ContextReducer.jsx
import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // console.log("Adding item to cart:", action.item);
            const newState = [...state, action.item];
            // console.log("New cart state:", newState);
            return newState;
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "UPDATE":
            // console.log("ContextReducer.jsx line 17")
            let updatedState = [...state];
            const indexToUpdate = updatedState.findIndex((food) => food.id === action.id);
            if (indexToUpdate !== -1) {
                updatedState[indexToUpdate] = {
                    ...updatedState[indexToUpdate],
                    qty: parseInt(action.qty) + updatedState[indexToUpdate].qty,
                    price: action.price + updatedState[indexToUpdate].price
                };
            }
            return updatedState;
        case "DROP":
            return [];
        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
