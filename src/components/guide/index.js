import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Icon } from "antd";
import "./index.less";

function Guide() {
//   const navigate = useNavigate();
  return (
    <div className="guide-fixed">
      <a
        href="https://github.com/hujinbin/monitoring-tool"
        target="_blank"
        rel="noopener noreferrer"
      >
         <img src={require('../../assets/github.png')}/>
      </a>
    </div>
  );
}

export default Guide;
