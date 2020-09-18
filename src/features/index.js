import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { MOVIES, moviesReducer, SELECTED, selectedMovieReducer } from "./movies/moviesSlice";

const rootReducer = combineReducers({
  [MOVIES]: moviesReducer,
  [SELECTED]: selectedMovieReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
