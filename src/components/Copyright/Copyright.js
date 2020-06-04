import React from "react";

import "./copy-right.style.css";

const Copyright = () => {
  return (
    <footer>
      {"Created by © Gordana Radivojevic"}{" "}
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Copyright;
