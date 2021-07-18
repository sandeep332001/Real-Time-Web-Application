import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      <FiberManualRecordIcon style={{ color: "73E831" }} />
      <h3 style={{ color: "black" }}>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        {/* <img src={closeIcon} alt="close icon" className="closeIcon" /> */}
        <CloseIcon style={{ color: "black" }} />
      </a>
    </div>
  </div>
);

export default InfoBar;
