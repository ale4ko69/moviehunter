/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../../features/movies/moviesSlice";
import { config } from "../../config/settings";


import GenerateId from "generate-id";
const g = new GenerateId();

export const Movie = () => {

    const dispatch = useDispatch();
    const { movies } = useSelector(state => state.movies);
    // const { selectedMovie } = useSelector(state => state.selected);

    var sortedMovies = [...movies];

    sortedMovies.sort((a, b) => {
        // console.log(parseFloat(a.imdbRating), parseFloat(b.imdbRating));
        if ( parseFloat(a.imdbRating) > parseFloat(b.imdbRating) ) return -1;
        if ( parseFloat(a.imdbRating) < parseFloat(b.imdbRating) ) return 1;
        return 0;
    });

    const handleSelectMovie = (id) => {
        //TODO PAGE FULL MOVIE
        const index = movies.findIndex(movie => movie.imdbID === id);
        if (index !== -1) {
            dispatch( selectMovie( {movie: movies[index]} ) );
        }

    }

    const ItemMovie = (props) => {
        const {Title, Poster, imdbRating, imdbVotes, imdbID} = props.item;
        // console.log(props.item, Title, Poster);
        return (
            <div className="movie">
                <div className="movie-image">
                    <a href={`${config.imdbURL}/title/${imdbID}`} title={`Full information ${Title}`} target="_blank" rel="noopener noreferrer">
                        <span className="play"><span className="name">{Title}</span></span>
                        <img src={Poster} alt="" />
                    </a>
                </div>
                <div className="rating">
                    <p>IMDB RATING: {imdbRating}</p>
                    <div className="comments" title="IMDB Votes">{imdbVotes}</div>
                    <div style={{cursor: 'pointer', textAlign: 'right'}}
                    {...({ onClick: e => handleSelectMovie(imdbID) })}>View more...</div>
                </div>
            </div>
        )
    }

    return (
        <>
        { sortedMovies.map( movie => (
            <ItemMovie key={g.generate(10)} item={movie} />
        ))}
        </>
    )
}


