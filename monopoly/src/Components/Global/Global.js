import React, {useState, useEffect} from "react";
import "./Global.css";
import Plot from "react-plotly.js";
import axios from "axios";
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";


const Global = () =>{
    let data = []
    const [finalProperties, setFinalProperties] = useState([])
    const [finalResults, setFinalResults] = useState([])
    const [finalCount, setFinalCount] = useState([])
    const [dropdownOpen, setDropdown] = useState(false)

    useEffect(()=>{
        axios.get("https://moponolyprobability.herokuapp.com/tiles")
        .then(res=>{
            for(const [key, value] of Object.entries(res.data)){
                data.push({"name": key, "count": value})
            }
            data.shift();
            data.sort(function(a, b){return b.count-a.count});
            let tempProp = []
            let tempCount = []
            for(let i = 0; i < data.length; i++ ){
                tempProp.push(data[i].name);
                tempCount.push(data[i].count);
            }
            setFinalProperties(tempProp);
            setFinalCount(tempCount);
            setFinalResults(data);
        })
    },[])
    return(
        <div className="globalWrapper">
            <div className="globalHeader">
                <h1>Global Results</h1>
                <p>Here are the global results of the simulation. Every time the application is executed, it will automatically send the data to our back end, where it will be tallied up and immediately viewable here. Below the graph (visible on desktop only) is a list of all of the properties and all the times they have been landed on throughout the existence of this application.</p>
            </div>
            <div className="plotWrapper">
                <Plot 
                    data={[
                    {
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: finalProperties, y: finalCount},
                    ]}
                    layout={ {width: 1500, height: 750}}
                    config = {{staticPlot: true}}
                />
            </div>
            <div id="resultsGlobal">
                <div className="resultsTitle">
                    <h1>Detailed Results <span onClick={()=>{setDropdown(!dropdownOpen)}}id="dropdownArrow">{dropdownOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}</span></h1> 
                </div>
                <div className={dropdownOpen ? "dropdown" : "hidden"}>
                    {
                        finalResults.map(item=>{
                            return(
                                <div className="resultsLine" key={item.name}>
                                    <p><span className="itemName">{item.name}</span>: <span className="itemCount">{item.count}</span></p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Global;