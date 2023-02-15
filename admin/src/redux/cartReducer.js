import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const item = state.products.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.taste === action.payload.taste &&
          item.crust === action.payload.crust &&
          JSON.stringify(item.addedIngredients) ===
            JSON.stringify(action.payload.addedIngredients) &&
          JSON.stringify(item.excludedIngredients) ===
            JSON.stringify(action.payload.excludedIngredients)
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      console.log(state.products);
      state.products = state.products.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.taste !== action.payload.taste ||
          item.crust !== action.payload.crust ||
          JSON.stringify(item.addedIngredients) !==
            JSON.stringify(action.payload.addedIngredients) ||
          JSON.stringify(item.excludedIngredients) !==
            JSON.stringify(action.payload.excludedIngredients)
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
