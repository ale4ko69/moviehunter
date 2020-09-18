/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, listTopRaited } from "./features/movies/moviesSlice";
import { Navigation } from './components/Navigation/Navigation';
import { HomeMain } from './components/HomeMain/HomeMain';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const { loading, movies } = useSelector(state => state.movies);

  useEffect(() => {
    listTopRaited.forEach((title) => {
      dispatch(fetchMovies({title}));
    })
  },[dispatch]);

  return (
    <div className="app-shell" id="shell">
      <div className="app-header" id="header">
        <h1 className="app-logo" id="logo"><a href="http://google.com">MovieHunter</a></h1>
        {<Navigation />}
      </div>
      <div className="app-main" id="main">
          <div className="app-content" id="content">
            <HomeMain />
          </div>
        <div className="cl">&nbsp;</div>
      </div>

      {<Footer />}

    </div>
  );
}

export default App;
