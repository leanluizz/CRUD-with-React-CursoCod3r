import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./Components/Home.jsx"
import UserCrud from "./User/UserCrud.jsx";

export default props => {
    return(
        <Routes>
            <Route index path="/" element={<Home />}   />
            <Route path="/users" element={<UserCrud />}  />
        </Routes>
    )
}