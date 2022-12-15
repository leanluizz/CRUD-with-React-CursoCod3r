import React from "react";
import Logo from "../images/logo.png"
import './Logo.css';
import { Link } from "react-router-dom";

export default props =>{
return(
    <aside className="logo">
        <center>
        <Link to="/">
         <img src={Logo} alt="Logo" />
        </Link>
        </center>
    </aside>
)
}