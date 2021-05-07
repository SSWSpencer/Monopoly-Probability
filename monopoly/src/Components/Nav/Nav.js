import React from "react";
import {Link, useLocation} from "react-router-dom";
import "./Nav.css";
import SiteLogo from "../../Images/Site Logo 2.png"

const Nav = () => {
    const location = useLocation().pathname;
    return(
        <>
            <div className="NavBar">
                <div className="logo">
                    <img src={SiteLogo} alt="Moponoly Probability Logo"/>
                    <h1>Moponoly Probability</h1>
                </div>
                <div className="NavLinks">
                    <Link to="/" className={(location === "/") ? "navSelection" : null}>Home</Link>
                    <Link to="/go" className={(location === "/go") ? "navSelection" : null}>Run Simulation</Link>
                    <Link to="/global" className={(location === "/global") ? "navSelection" : null}>Global Results</Link>
                    <Link to="/about" className={(location === "/about") ? "navSelection" : null}>About</Link>
                </div>
            </div>
            <hr />
        </>
    )
}   

export default Nav;