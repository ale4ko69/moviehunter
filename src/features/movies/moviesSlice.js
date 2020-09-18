import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoviesAPI } from "./moviesAPI";

export const listTopRaited = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    'Schindler\'s List',
    'The Lord of the Rings: The Return of the King',
    'Pulp Fiction',
    'The Good, the Bad and the Ugly',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Fight Club',
    'Forrest Gump'
]

const name = "movies";
const selectedMovie = 'selected';

const initialState = {
  loading: false,
  error: null,
  movies: [],

};

const initStateSelectedMovie = {
  selectedMovie: null
}

const fetchMovies = createAsyncThunk("movies/fetchMovies", async (args, thunkAPI) => {
  // Default params
  const params = {
    title: ''
  };
  // Assingn Default and User params
  Object.assign(params, args);
  // Get Movies
  const response = await getMoviesAPI(params);
  return response;
});

const moviesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
    //   const arg = action.meta.arg || { type: "root" };
    //   console.log("pending", arg);
      if (!state.loading) {
        // TODO loader for current selected node
        state.loading = true;
      }
    },
    [fetchMovies.fulfilled]: (state, action) => {
      // console.log("fulfilled", action);
      const { payload } = action;

        state.loading = false;
        // Root Movies
        state.movies.push(payload);

    },
    [fetchMovies.rejected]: (state, action) => {
      console.log(action);
    //   const strType = action.meta.args ? action.meta.args.type : "root";
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    }
  }
});

const selectedMovieSlice = createSlice({
  name: selectedMovie,
  initialState: initStateSelectedMovie,
  reducers: {
    selectMovie: (state, {payload: { movie }} ) => {
      console.log("Movie", movie);
      state.selectedMovie = movie;
      // TODO OPEN DETAILS
    },
    clearSelectedMovie: (state, {payload}) => {
      console.log('Close Details Movie');
      state.selectedMovie = null;
    }
  },
})

export const { selectMovie, clearSelectedMovie } = selectedMovieSlice.actions;
export { fetchMovies };
export const MOVIES = name;
export const SELECTED = selectedMovie;
export const moviesReducer = moviesSlice.reducer;
export const selectedMovieReducer = selectedMovieSlice.reducer;
