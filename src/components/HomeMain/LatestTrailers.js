/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Movie } from './Movie';
import { clearSelectedMovie } from "../../features/movies/moviesSlice";
import { IfRender } from '../../components/ifRender';
import { Popup } from "../../components/Popup/Popup";
import { Details } from "../../components/Details/Details";

const Loader = () => {
    return (
        <div className="overlay-spinner">
            <div className="cm-spinner"></div>
        </div>
    )
}

export const LatestTrailers = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.movies);
    const { selectedMovie } = useSelector(state => state.selected);

    const closeDetailsHandler = () => {
        dispatch(clearSelectedMovie());
    }

    return (
        <>
            <IfRender isRender={!loading} elsElement={<Loader />}>
                <div className="box">
                    <div className="head">
                        <h2>IMDb Top Rated Movies</h2>
                        <p className="text-right"><a href="#">See all</a></p>
                    </div>
                    <div className="movie-wrapper">
                        <Movie />
                    </div>
                </div>

                <IfRender isRender={!!selectedMovie}>
                    <Popup closePopup={closeDetailsHandler}>
                        <Details />
                    </Popup>
                </IfRender>
            </IfRender>
        </>
    )
}
