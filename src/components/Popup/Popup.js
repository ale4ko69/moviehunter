/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './style.css';

export const Popup = (props) => {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <sapn class="close" title="Close" onClick={props.closePopup}>×</sapn>
                {props.children}
            </div>
      </div>
    )
}
