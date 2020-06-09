import { createSlice } from "@reduxjs/toolkit";

// Define initial state, slice name, and reducers
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    todos: [],
    errorMessage: null,
  },
  reducers: {
    todoUpdating(state) {
      state.loading = true;
    },
    todoAdded(state, action) {
      state.loading = false;
      state.errorMessage = null;
      state.todos = [...state.todos, action.payload];
    },
    todoDeleted(state, action) {
      state.loading = false;
      state.errorMessage = null;
      state.todos = state.todos.filter((t) => t !== action.payload);
    },
    todoError(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

// Export actions
export const {
  todoUpdating,
  todoAdded,
  todoDeleted,
  todoError,
} = todoSlice.actions;

// Add a new todo to the list
export const addTodo = (todo) => async (dispatch) => {
  if (!todo) return;
  dispatch(todoUpdating());
  dispatch(todoAdded(todo));
};

// Add a new todo to the list
export const removeTodo = (todo) => async (dispatch) => {
  if (!todo) return;
  dispatch(todoUpdating());
  dispatch(todoDeleted(todo));
};

// Example of an async thunk that dispatches actions
export const fetchRandomTodo = () => async (dispatch) => {
  dispatch(todoUpdating());
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => dispatch(todoAdded(json.title)))
    .catch((error) => dispatch(todoError(error.toString())));
};

// Set up simple selectors
const loading = (state) => state.todos.loading;
const todos = (state) => state.todos.todos;
const errorMessage = (state) => state.todos.errorMessage;

// Export as group for easier import in components
export const todoSelectors = { loading, todos, errorMessage };

// Export reducer by default for loading into configureStore
export default todoSlice.reducer;
