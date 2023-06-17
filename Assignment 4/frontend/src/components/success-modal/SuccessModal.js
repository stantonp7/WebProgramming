import React from "react";
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import "./SuccessModal.css";

const SuccessModal = props => {
    return ReactDOM.createPortal(
        <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
        <div className="SuccessModal">
        <div className="SuccessModal__content">
            <h2>{props.message ?? 'Success!'}</h2>
            <div className="SuccessModal__actions">
            <button className="SuccessModal__button" onClick={props.onConfirm}>
                OK
            </button>
            </div>
        </div>
        </div>
        </CSSTransition>,
        document.getElementById('modal-root')
    );
}

export default SuccessModal;