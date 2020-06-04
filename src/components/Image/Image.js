import React from "react";

import Fade from "react-reveal/Fade";

import img from "../../assets/img.jpg";

import "./image.style.css";

const Image = () => {
  return (
    <div className="img">
      <Fade top>
        <h2 className="img-title">
          "If It Doesn't Challenge You, It Doesn't Change You!"
        </h2>
      </Fade>
      <img className="main-image" src={img} alt="" />
    </div>
  );
};

export default Image;
