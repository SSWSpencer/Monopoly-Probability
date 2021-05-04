import React from "react";
import "./About.css";
import Moponoly from "../../Images/Moponoly.png";
import MoponolySmall from "../../Images/MoponolySmall.png"
import { MapInteractionCSS } from 'react-map-interaction';

const About = () =>{
    return(
        <div className="AboutWrapper">
            <div className="aboutBoxWrapper">
                <div className="aboutBox">
                    <h1>About the Application</h1>
                    <p>This is a project that works to answer the unasked question of what the most landed-on tile in Moponoly is. By running the simulation, an entire game of Moponoly will be played through right in your browser. The application will keep a record of how many time each tile was landed on throughout the game, and it will be reported back to you after the simulation has concluded. Finally, the data from your simulation will be forwarded to our back end, and will be added to the Global Results.</p>
                </div>
                <div className="aboutBox">
                    <h1>Why Moponoly?</h1>
                    <p>I got the idea to build this application midway through watching a YouTube video titled "<a href="https://www.youtube.com/watch?v=g2mLOVHZ2u4&t=437s">A Solid 20 Minutes of Useless Information</a>". In the video, it states that a specific tile is the most commonly landed on tile in a specific board game. After a bit of research, I found numerous sources also saying the same thing. I built this web app to prove whether that statement is true or false through means of creating a concrete simulation that can be run on any machine, and will take in a large dataset.</p>
                </div>
                <div className="aboutBox">
                    <h1>How Does it Work?</h1>
                    <p>If you're familiar with the rules of Moponoly, you're probably wondering how a game like it can be simulated. Winning a game relies on strategy and intuition far more than it does random chance, so programming AI to determine a strategy to win the game is a massive task. However, this application isn't set out to do that. A player's position in Moponoly comes from one source-- the dice they roll. That means that at its core, this entire simluation is just a random number generator with rules.</p>
                </div>
                <div className="aboutBox">
                    <h1>Game Mechanics and Structure</h1>
                    <p>The game starts with both players having $1500 in their balance. The game concludes when a player has no property left to mortgage, and is unable to pay off a fine. Players travel around the board, follow the instructions of what their current tile tells them to do, and then it switches turns. Other rules, such as double rolls, drawing cards, and going to jail are also programmed in. For a full idea of what the game does with each cycle, refer to the flowchart below.</p>
                </div>
            </div>
            <div className="imagemag">
                <MapInteractionCSS>
                    <img src={Moponoly} />
                </MapInteractionCSS>
            </div>
        </div>
    )
}

export default About