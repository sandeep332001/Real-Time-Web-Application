import React from "react";

// import onlineIcon from '../../icons/onlineIcon.png';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer con_image">
    <div>
      <h1>Realtime Chat Application </h1>
      <h2>Created with React, Express, Node and Socket.IO</h2>
      <h2>Try it out right now! </h2>
    </div>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <FiberManualRecordIcon style={{ color: "73E831" }} /> {name}
                {/* <img alt="Online Icon" src={onlineIcon}/> */}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
