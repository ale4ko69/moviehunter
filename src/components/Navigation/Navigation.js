/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import GenerateId from "generate-id";
import { useDispatch, useSelector } from "react-redux";

const g = new GenerateId();

export const Navigation = () => {

    return (
        <>
          <div className="app-navigation" id="navigation">
            <ul>
              <li><a className="active" href="#">HOME</a></li>
              <li><a href="#">NEWS</a></li>
              <li><a href="#">IN THEATERS</a></li>
              <li><a href="#">COMING SOON</a></li>
              <li><a href="#">CONTACT</a></li>
              <li><a href="#">ADVERTISE</a></li>
            </ul>
          </div>
          <div className="app-sub-navigation" id="sub-navigation">
            <ul>
              <li><a href="#">SHOW ALL</a></li>
              <li><a href="#">TOP RATED</a></li>
              <li><a href="#">MOST COMMENTED</a></li>
            </ul>
            <div className="app-search" id="search">
              <form action="#" method="get" acceptCharset="utf-8">
                <label htmlFor="search-field">SEARCH</label>
                <input type="text" name="search field" placeholder="Enter search here" id="search-field" className="blink search-field"  />
                <input type="submit" value="GO!" className="search-button" />
              </form>
            </div>
          </div>
        </>
    )
}
