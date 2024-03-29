import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    const todos = state.todos.todos;
    localStorage.setItem('todos', JSON.stringify(todos));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

