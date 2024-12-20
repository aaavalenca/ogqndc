import React, { useEffect, useState } from "react";
import styles from "../Sidebar.module.css";
import {SidebarData} from '../SidebarData'

const Sidebar: React.FC = () => {

  return (
    <div className={styles.Sidebar}>
      <ul className={styles.SidebarList}>
        {SidebarData.map((val, key)=> {
          const isActive = window.location.pathname === val.link;

          return(
            <li
            className={`${styles.row} ${isActive ? styles.active : ""}`}
            id={window.location.pathname == val.link ? "active" : ""}
            key={key}
            onClick={()=>window.location.pathname = val.link}>
              <div className={styles.icon}>
                {val.icon}
              </div>
              <div className={styles.title}>
                {val.title}
              </div>
            </li>
          )
        })}

        </ul>
  </div>
  
  );
};

export default Sidebar;
