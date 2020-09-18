/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import { config } from "../../config/settings";
import { shortTimeHumanizer } from '../../util';
import _ from 'lodash';
import './style.css';

const imdb = config.imdbURL;
const youtube = config.youtubeURL;

const getGenre = (arr) => {
    const arrGenre = arr.split(',');
    const len = arrGenre.length;
    return arrGenre.map((genre, index) => (
            <span key={index}>
            <a  href={`${imdb}search/title?genres=${genre.trim()}&amp;explore=title_type,genres&amp;ref_=tt_ov_inf`}
                target="_blank">{genre.trim()}</a>
                { (index < len - 1) ? _.padEnd(',', 2, ' ') : '' }
            </span>
        )
    )
}

const getDuration = (strDuration) => {
    const minutes = strDuration.split(' ')[0] * 60000;
    const regExe = /(\d{1,2})\sh,\s(\d{1,2})\sm/gi;
    const replacer = (match, hours, minutes, offset, string) => {
        return `${hours}h ${minutes}min`;
    }
    return shortTimeHumanizer(minutes).replace(regExe, replacer);
}

export const Details = (props) => {
    const { selectedMovie } = useSelector(state => state.selected);


    return (
        <div id="title-overview-widget" className="heroic-overview" >
            <div className="vital">
                <div className="title_block">
                    <div className="title_bar_wrapper">
                        <div className="ratings_wrapper">
                            <div className="imdbRating">
                                <div className="ratingValue">
                                    <strong title={`${selectedMovie.imdbRating} based on ${selectedMovie.imdbVotes} user ratings`}><span>{selectedMovie.imdbRating}</span></strong><span className="grey">/</span><span className="grey">10</span>
                                </div>
                                <a href={`${imdb}title/${selectedMovie.imdbID}/ratings?ref_=tt_ov_rt`}><span className="small">{selectedMovie.imdbVotes}</span></a>
                            </div>
                        </div>

                        <div className="titleBar">
                            <div className="primary_ribbon">
                                <div className="ribbonize" style={{ position: 'relative' }}>
                                    <div className="wl-ribbon standalone not-inWL"></div>
                                </div>
                            </div>

                            <div className="title_wrapper">
                                <h1 className="">{selectedMovie.Title}&nbsp;<span id="titleYear">(<a href={`${imdb}year/${selectedMovie.Year}/?ref_=tt_ov_inf`} target="_blank">{selectedMovie.Year}</a>)</span> </h1>
                                <div className="subtext">
                                    {selectedMovie.Rated}
                                    <span className="ghost">|</span> <time>{getDuration(selectedMovie.Runtime)}</time>
                                    <span className="ghost">|</span>
                                    {getGenre(selectedMovie.Genre)}
                                    <span className="ghost">|</span>
                                    <a href={`${imdb}title/${selectedMovie.imdbID}/releaseinfo?ref_=tt_ov_inf`} target="_blank" title="See more release dates">{selectedMovie.Released} (USA)</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slate_wrapper">
                    <div className="poster">
                            <img alt={selectedMovie.Title} title={selectedMovie.Title}
                                src={selectedMovie.Poster} />
                    </div>
                    <div className="movieContent">
                        <div className="plot_summary_wrapper">

                            <div className="plot_summary">
                                <div className="summary_text">
                                    {selectedMovie.Plot}
                                </div>

                                <div className="credit_summary_item">
                                    <h4 className="inline">Production:</h4>
                                    {selectedMovie.Production}
                                </div>
                                <div className="credit_summary_item">
                                    <h4 className="inline">Director:</h4>
                                    {selectedMovie.Director}
                                </div>
                                <div className="credit_summary_item">
                                    <h4 className="inline">Writers:</h4>
                                    {selectedMovie.Writer}
                                </div>
                                <div className="credit_summary_item">
                                    <h4 className="inline">Actors:</h4>
                                    {selectedMovie.Actors}
                                </div>
                                <div className="credit_summary_item">
                                    <h4 className="inline">Language:</h4>
                                    {selectedMovie.Language}
                                </div>
                                <div className="credit_summary_item">
                                    <h4 className="inline">Awards:</h4>
                                    {selectedMovie.Awards}
                                </div>
                                 <div className="credit_summary_item">
                                    <h4 className="inline">Box office:</h4>
                                    {selectedMovie.BoxOffice}
                                </div>
                                  <div className="credit_summary_item">
                                    <h4 className="inline">Release on DVD:</h4>
                                    {selectedMovie.DVD}
                                </div>
                            </div>
                            <div className="youtube">
                                <a href={`${youtube}results?search_query=${selectedMovie.Title}`} target="_blank">Search "{selectedMovie.Title}" movie on Youtube.</a>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
