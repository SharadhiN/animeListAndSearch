import React from "react";

const Modal = ({ hideModal }) => {
  return (
    <div className="modal-container" data-testid="modal-container">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2>Anilist Unofficial</h2>
          <p>Version 1.0.0</p>
        </div>

        <div className="modal-content">
          <div className="modal-body">
            <h3>App Features</h3>
            <ul>
              <li>Get list of animes.</li>
              <li>Search animes by title.</li>
              <li>Get anime details by ID.</li>
            </ul>
          </div>
        </div>

        <div className="modal-enphasis">
          <p>Hope you enjoy this version.</p>
        </div>

        <div className="modal-button">
          <button onClick={hideModal} data-testid="hide-modal-btn">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;