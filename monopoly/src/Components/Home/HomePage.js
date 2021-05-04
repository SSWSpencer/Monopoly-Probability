import React from "react";
import "./HomePage.css"
import {Link} from "react-router-dom";
import HomePageBoard from "../../Images/HomePageBoard.png";
import Denied from "../../Images/denied.png";

const HomePage = () =>{
    return(
        <div className="HomePage">
            <div className="HomePageHeader">
                <h1>What is Moponoly?</h1>
                <p>Moponoly is a game that has no legal association with any other board game in existence. While its name and gameplay are strikingly similar to a different board game whose name is trademarked and protected by a popular toy and game company, there is no association between this project and the aforementioned company. The fact that permission to use the name of the popular board game was denied is purely coincidental, and attached is proof of denial.</p>
                <img src={Denied} alt="No permission, denied!"/>
                <p>While the game itself is totally 100% different from other property buying and selling board games, the rules and gameplay are exactly the same. This is a simulation designed to run through a game of Moponoly and determine what the most likely tiles to land on are.</p>
            </div>
            <div className="imgWrapper">
                <div className="imgButtons">                    
                    <a href="#readmore" className="leftButton">Read More</a>
                    <Link to="/about"className ="centerButton">About the Simulation</Link>
                    <Link to="/go" className="rightButton">Start the Simulation</Link>
                </div>
                <img src={HomePageBoard}/>
            </div>
            <div className="HomePageBottomWrapper">    
                <h1 id="readmore">Background</h1>                
                <div className="HomePageBottom">
                    <div className="HomePageBox"> 
                        <h2>General Background</h2>
                        <p>There are many sources both on and off the internet claiming the existence of some hot spots on a Moponoly board, where players have the highest likelihood of landing. According to some sources, the tile following 14 positions after jail is the most frequent spot to be landed on. This application serves to either prove or disprove that statement through means of autonomous computer simulation.</p>
                    </div>
                    <div className="HomePageBox">
                        <h2>Dice Predictability</h2>
                        <p>When a player rolls a single die, you are essentially generating a random number, and there is basically no predictability. However, when more than one die is factored into the equation, the probabilities do not increase linearly. There are 36 possible ways to arrange two dice, with a value of 7 having the highest likelihood of being rolled, with a 1/6 chance. For every number traveled away from 7, the probability of rolling said value decreases by 1/36.</p>
                    </div>
                    <div className="HomePageBox">
                        <h2>The Simluation</h2>
                        <p>This application simulates an entire game of Moponoly in seconds. After the simluation ends, it reports back the number of times each tile is landed on. It will also send the data to our back end server, where a global tally is recorded, as to take as large of a sample size as possible.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;