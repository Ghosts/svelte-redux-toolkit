import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export default store;

export const useSelector = (select, onChange) => {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  store.subscribe(handleChange);
  handleChange();
  return currentState;
};
