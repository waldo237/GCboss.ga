import React, {ReactNode, useState}  from 'react'
import './ToolTip.scss'
import styles from "../App.module.scss";
export default function ToolTip(props:{ children?:ReactNode, text:String, enable:boolean }) {
    const {children, text, enable} = props
    const [show, setShow] = useState(false);
  
    return (
      <div className="tooltip-container">
        <div className={show && enable ? 'tooltip-box visible' : 'tooltip-box'}>
          {text}
          <span className="tooltip-arrow" />
        </div>
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={styles.cols}
        >
          {children}
        </div>
      </div>
    );
  };