import React, {useState} from "react";
import Board from "./GameData/Board.json";
import ChanceCards from "./GameData/ChanceCards.json";
import CommunityChest from "./GameData/CommunityChest.json";
import HomePageBoard from "../Images/HomePageBoard.png";
import "./GameData/MoponolyGame.css";
import Loading from "../Images/loading.gif";
import Plot from "react-plotly.js";
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";

const MoponolyGame = () =>{
    let board = Board;

    const rollDice = () =>{
        let doubles = false;
        let die1 = Math.floor(Math.random() * 6) + 1;
        let die2 = Math.floor(Math.random() * 6) + 1;
        if(die1 === die2){
            doubles = true;
        }
        return {value: die1 + die2, doubleRoll: doubles}
    }
    let chanceDeck = ChanceCards;
    let ccDeck = CommunityChest;


    let Player1 = {
        name: "Player1",
        cash: 1500,
        currentPosition: 0,
        jailed: false,
        thriceCount: 0,
        property: [],
        mortgaged: []
    }
    let Player2 = {
        name: "Player2",
        cash: 1500,
        currentPosition: 0,
        jailed: false,
        thriceCount: 0,
        property: [],
        mortgaged: []
    }

    function PlayGame (){

        board = Board;

        Player1 = {
            name: "Player1",
            cash: 1500,
            currentPosition: 0,
            jailed: false,
            thriceCount: 0,
            property: [],
            mortgaged: []
        }
        Player2 = {
            name: "Player2",
            cash: 1500,
            currentPosition: 0,
            jailed: false,
            thriceCount: 0,
            property: [],
            mortgaged: []
        }

        let GameOver = false;
        let Player1Turn = true;
        let Player2Turn = false;
        let turns = 0;
        while(!GameOver){
            while(Player1Turn){
                //console.log(Player1);
                if(Player1.jailed){
                    if(Player1.thriceCount < 3){
                        if(rollDice().doubleRoll){
                            Player1.jailed = false;
                            Player1.thriceCount = 0;
                            //console.log("Player 1 out of jail due to double roll")
                        }
                        else{
                            Player1.thriceCount = Player1.thriceCount + 1;
                            Player1Turn = false;
                            Player2Turn = true;
                            //console.log("Player 1 thrice count + 1")
                        }
                    }
                    else if(Player1.cash >= 200){
                        //console.log("Player 1 paid to get out of jail")
                        Player1.jailed = false;
                        Player1.thriceCount = 0;
                        Player1.cash = Player1.cash - 200;
                    }
                    else{
                        while(Player1.cash < 200){
                            if(Player1.property.length > 1){
                                //console.log("Player 1 mortaged property " + Player1.property[0].name + " for $" + Player1.property[0].mortgage + " going from $" + Player1.cash + " to $" + (Player1.cash + Player1.property[0].mortgage));
                                Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                Player1.mortgaged.push(Player1.property[0]);
                                Player1.property.shift();
                                //console.log(Player1.cash);
                            }
                            else{
                                //console.log("Game Over");
                                GameOver = true;
                                Player1Turn = false;
                                break;
                            }
                        }


                    }
                }
                if(!Player1.jailed){
                    if(Player1.mortgaged.length > 0){
                        let newMortgaged = [];
                        for(let i = 0; i < Player1.mortgaged.length; i++){
                            if(Player1.cash >= Player1.mortgaged[i].mortgage){
                                //console.log("Player 1 un-mortgages property " + Player1.mortgaged[i].name);
                                Player1.cash = Player1.cash - Player1.mortgaged[i].mortgage;
                                Player1.property.push(Player1.mortgaged[i]);
                            }
                            else{
                                newMortgaged.push(Player1.mortgaged[i]);
                            }
                        }
                        Player1.mortgaged = newMortgaged;
                    }
                    let roll = rollDice();
                    //console.log("PLAYER 1 ROLL: " + roll.value, roll.doubleRoll);
                    Player1.currentPosition = Player1.currentPosition + roll.value;
                    if(Player1.currentPosition > 39){
                        Player1.currentPosition = Player1.currentPosition - 40;
                    }
                    board[Player1.currentPosition].count = board[Player1.currentPosition].count + 1;
                    if(board[Player1.currentPosition].buy <= Player1.cash && board[Player1.currentPosition].owner === ""){
                        board[Player1.currentPosition].owner = Player1.name;
                        Player1.cash = Player1.cash - board[Player1.currentPosition].buy;
                        Player1.property.push(board[Player1.currentPosition]);
                    }
                    if(board[Player1.currentPosition].index === 7 || board[Player1.currentPosition].index === 22 || board[Player1.currentPosition].index === 36){
                        let index = Math.floor(Math.random() * chanceDeck.length);
                        if(index === 0){
                            //console.log("Chance: Player 1 moves to Illinois Avenue");
                            Player1.currentPosition = 24;
                        }
                        else if(index === 1){
                            //console.log("Chance: Player 1 moevs to St Charles Place")
                            Player1.currentPosition = 11;
                        }
                        else if(index === 2){
                            //console.log("Chance: Player 1 moves to nearest utility")
                            if(Player1.currentPosition > 12 && Player1.currentPosition <= 28){
                                Player1.currentPosition = 28;
                            }
                            else{
                                Player1.currentPosition = 12;
                            }
                        }
                        else if(index === 3){
                            //console.log("Chance: Player 1 moves to nearest railroad")
                            if(Player1.currentPosition > 5 && Player1.currentPosition <= 15){
                                Player1.currentPosition = 15;
                            }
                            else if(Player1.currentPosition > 15 && Player1.currentPosition <=25){
                                Player1.currentPosition = 25;
                            }
                            else if(Player1.currentPosition > 25 && Player1.currentPosition <= 35){
                                Player1.currentPosition = 35;
                            }
                            else{
                                Player1.currentPosition = 5;
                            }
                        }
                        else if(index === 4){
                            //console.log("Chance: Bank pays Player 1 $50");
                            Player1.cash = Player1.cash + 50;
                        }
                        else if(index === 5){
                            //console.log("Chance: Get out of jail free!");
                        }
                        else if(index === 6){
                            //console.log("Chance: Player 1 moves back 3 spaces!")
                            Player1.currentPosition = Player1.currentPosition - 3;
                        }
                        else if(index === 7){
                            //console.log("Chance: Player 1 goes to jail!");
                            Player1.jailed = true;
                            Player1Turn = false;
                            Player2Turn = true;
                        }
                        else if(index === 8){
                            //console.log("Chance: Player 1 pays for general repairs on all property")
                            let payPrice = (Player1.property.length * 25);
                            if (Player1.cash >= payPrice){
                                Player1.cash = Player1.cash - payPrice;
                            }
                            else{
                                while(Player1.cash <= payPrice){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - payPrice;
                            }
                        }
                        else if(index === 9){
                            //console.log("Chance: Pay poor tax!")
                            if (Player1.cash >= 15){
                                Player1.cash = Player1.cash - 15;
                            }
                            else{
                                while(Player1.cash <= 15){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - 15;
                            }
                        }
                        else if(index === 10){
                            //console.log("Chance: Player 1 moves to Reading Railroad");
                            Player1.currentPosition = 5;
                        }
                        else if(index === 11){
                            //console.log("Chance: Player 1 moves to Boardwalk");
                            Player1.currentPosition = 39;
                        }
                        else if(index === 12){
                            //console.log("Chance: Player 1 is chairman of the board")
                            if (Player1.cash >= 50){
                                Player1.cash = Player1.cash - 50;
                                Player2.cash = Player2.cash + 50;
                            }
                            else{
                                while(Player1.cash <= 50){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - 50;
                                Player2.cash = Player2.cash + 50;
                            }
                        }
                        else if (index === 13){
                            //console.log("Chance: Player 1's building and loan matures")
                            Player1.cash = Player1.cash + 150;
                        }
                        else if(index === 14){
                            //console.log("Chance: Player 1 has won a crossword competition")
                                Player1.cash = Player1.cash + 100;
                        }
                        else if(index === 15){
                            //console.log("Chance: Player 1 advances to Go!" );
                            Player1.currentPosition = 0;
                        }
                    }
                    if(board[Player1.currentPosition].index === 2 || board[Player1.currentPosition].index === 17 || board[Player1.currentPosition].index === 33){
                        let index = Math.floor(Math.random() * ccDeck.length);
                        if(index === 0){
                            //console.log("Community Chest: Player 1 moves to Go");
                            Player1.currentPosition = 0;
                        }
                        else if(index === 1){
                            //console.log("Community Chest: Bank error in Player 1's favor");
                            Player1.cash = Player1.cash + 200;
                        }
                        else if(index === 2){
                            //console.log("Community Chest: Player 1 has doctor's fees");
                            if (Player1.cash >= 50){
                                Player1.cash = Player1.cash - 50;
                            }
                            else{
                                while(Player1.cash <= 50){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - 50;
                            }
                        }
                        else if(index === 3){
                            //console.log("Community Chest: Player 1 receives $50 from sale of stock");
                            Player1.cash = Player1.cash + 50;
                        }
                        else if(index === 4){
                            //console.log("Community Chest: Get out of jail free!");
                        }
                        else if(index === 5){
                            //console.log("Community Chest: Player 1 goes to jail!");
                            Player1.jailed = true;
                            Player1Turn = false;
                            Player2Turn = true;
                        }
                        else if(index === 6){
                            //console.log("Community Chest: Player 1 has a grand opera night and collects $50");
                            Player1.cash = Player1.cash + 50;
                        }
                        else if(index === 7){
                            //console.log("Community Chest: Player 1's Holiday fund matures");
                            Player1.cash = Player1.cash + 100;
                        }
                        else if(index === 8){
                            //console.log("Community Chest: Player 1 income tax refund");
                            Player1.cash = Player1.cash + 20;
                        }
                        else if(index === 9){
                            //console.log("Community Chest: Player 1 has a birthday");
                            Player1.cash = Player1.cash + 10;
                        }
                        else if(index === 10){
                            //console.log("Community Chest: Player 1's life insurance matures!");
                            Player1.cash = Player1.cash + 100;
                        }
                        else if(index === 11 || index === 12){
                            if(index === 11){
                                //console.log("Community Chest: Hospital Fees");
                            }
                            if(index === 12){
                                //console.log("School Fees")
                            }
                            if (Player1.cash >= 50){
                                Player1.cash = Player1.cash - 50;
                            }
                            else{
                                while(Player1.cash <= 50){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - 50;
                            }
                        }
                        else if(index === 13){
                            //console.log("Community Chest: Player 1 receives $25 consultancy fee");
                            Player1.cash = Player1.cash + 25;
                        }
                        else if(index === 14){
                            //console.log("Community Chest: Player 1 is assessed for street repairs");
                            let payPrice = Player1.property.length * 40;
                            if (Player1.cash >= payPrice){
                                Player1.cash = Player1.cash - payPrice;
                            }
                            else{
                                while(Player1.cash <= payPrice){
                                    if(Player1.property.length > 0){
                                        Player1.mortgaged.push(Player1.property[0]);
                                        Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                        Player1.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player1Turn = false;
                                        break;
                                    }
                                }
                                Player1.cash = Player1.cash - payPrice;
                            }
                        }
                        else if(index === 15){
                            //console.log("Community Chest: Player 1 has won second place in a beauty contest");
                            Player1.cash = Player1.cash + 10;
                        }
                        else if(index === 15){
                            //console.log("Community Chest: Player 1 inherits $50");
                            Player1.cash = Player1.cash + 100;
                        }
                    }
                    if(board[Player1.currentPosition].owner === Player2.name){
                        if(Player1.cash >= board[Player1.currentPosition].rent){
                            Player1.cash = Player1.cash - board[Player1.currentPosition].rent;
                            Player2.cash = Player2.cash + board[Player1.currentPosition].rent;
                            //console.log("Player 1 Pays Player 2 $" + board[Player1.currentPosition].rent + " for landing on " + board[Player1.currentPosition].name);
                        }
                        else{
                            while(Player1.cash < board[Player1.currentPosition].rent){
                                if(Player1.property.length > 1){
                                    //console.log("Player 1 mortaged property " + Player1.property[0].name + " for $" + Player1.property[0].mortgage + " going from $" + Player1.cash + " to $" + (Player1.cash + Player1.property[0].mortgage));
                                    Player1.cash = Player1.cash + Player1.property[0].mortgage;
                                    Player1.mortgaged.push(Player1.property[0]);
                                    Player1.property.shift();
                                    //console.log(Player1.cash);
                                }
                                else{
                                    //console.log("Game Over");
                                    GameOver = true;
                                    Player1Turn = false;
                                    break;
                                }
                            }
                            Player1.cash = Player1.cash - board[Player1.currentPosition].rent;
                            Player2.cash = Player2.cash + board[Player1.currentPosition].rent;
                            //console.log("Player 1 Pays Player 2 $" + board[Player1.currentPosition].rent + " for landing on " + board[Player1.currentPosition].name);
                        }
                    }
                    if(!roll.doubleRoll){
                        Player1.thriceCount = 0;
                        Player1Turn = false;
                        Player2Turn = true;
                    }
                    if(roll.doubleRoll){
                        Player1.thriceCount = Player1.thriceCount + 1;
                        if (Player1.thriceCount === 3){
                            Player1.jailed = true;
                            Player1Turn = false;
                            Player2Turn = true;
                        }
                    }
                }
            }
            if(GameOver){
                //console.log("Game Over");
                break;
            }
            while(Player2Turn){
                //console.log(Player2);
                if(Player2.jailed){
                    if(Player2.thriceCount < 3){
                        if(rollDice().doubleRoll){
                            Player2.jailed = false;
                            Player2.thriceCount = 0;
                            //console.log("Player 2 out of jail due to double roll")
                        }
                        else{
                            Player2.thriceCount = Player2.thriceCount + 1;
                            Player2Turn = false;
                            Player1Turn = true;
                            //console.log("Player 2 thrice count + 1")
                        }
                    }
                    else if(Player2.cash >= 200){
                        //console.log("Player 2 paid to get out of jail")
                        Player2.jailed = false;
                        Player2.thriceCount = 0;
                        Player2.cash = Player2.cash - 200;
                    }
                    else{
                        while(Player2.cash < 200){
                            if(Player2.property.length > 1){
                                //console.log("Player 2 mortaged property " + Player2.property[0].name + " for $" + Player2.property[0].mortgage + " going from $" + Player2.cash + " to $" + (Player2.cash + Player2.property[0].mortgage));
                                Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                Player2.mortgaged.push(Player2.property[0]);
                                Player2.property.shift();
                                //console.log(Player2.cash);
                            }
                            else{
                                GameOver = true;
                                //console.log("Game Over");
                                Player2Turn = false;
                                break;
                            }
                        }

                    }
                }
                if(!Player2.jailed){
                    if(Player2.mortgaged.length > 0){
                        let newMortgaged = [];
                        for(let i = 0; i < Player2.mortgaged.length; i++){
                            if(Player2.cash >= Player2.mortgaged[i].mortgage){
                                //console.log("Player 2 un-mortgages property " + Player2.mortgaged[i].name);
                                Player2.cash = Player2.cash - Player2.mortgaged[i].mortgage;
                                Player2.property.push(Player2.mortgaged[i]);
                            }
                            else{
                                newMortgaged.push(Player2.mortgaged[i]);
                            }
                        }
                        Player2.mortgaged = newMortgaged;
                    }
                    let roll = rollDice();
                    //console.log("PLAYER 2 ROLL: " + roll.value, roll.doubleRoll);
                    Player2.currentPosition = Player2.currentPosition + roll.value;
                    if(Player2.currentPosition > 39){
                        Player2.currentPosition = Player2.currentPosition - 40;
                    }
                    board[Player2.currentPosition].count = board[Player2.currentPosition].count + 1;
                    if(board[Player2.currentPosition].buy <= Player2.cash && board[Player2.currentPosition].owner === ""){
                        board[Player2.currentPosition].owner = Player2.name;
                        Player2.cash = Player2.cash - board[Player2.currentPosition].buy;
                        Player2.property.push(board[Player2.currentPosition]);
                    }
                    if(board[Player2.currentPosition].index === 7 || board[Player2.currentPosition].index === 22 || board[Player2.currentPosition].index === 36){
                        let index = Math.floor(Math.random() * chanceDeck.length);
                        if(index === 0){
                            //console.log("Chance: Player 2 moves to Illinois Avenue");
                            Player2.currentPosition = 24;
                        }
                        else if(index === 1){
                            //console.log("Chance: Player 2 moevs to St Charles Place")
                            Player2.currentPosition = 11;
                        }
                        else if(index === 2){
                            //console.log("Chance: Player 2 moves to nearest utility")
                            if(Player2.currentPosition > 12 && Player2.currentPosition <= 28){
                                Player2.currentPosition = 28;
                            }
                            else{
                                Player2.currentPosition = 12;
                            }
                        }
                        else if(index === 3){
                            //console.log("Chance: Player 2 moves to nearest railroad")
                            if(Player2.currentPosition > 5 && Player2.currentPosition <= 15){
                                Player2.currentPosition = 15;
                            }
                            else if(Player2.currentPosition > 15 && Player2.currentPosition <=25){
                                Player2.currentPosition = 25;
                            }
                            else if(Player2.currentPosition > 25 && Player2.currentPosition <= 35){
                                Player2.currentPosition = 35;
                            }
                            else{
                                Player2.currentPosition = 5;
                            }
                        }
                        else if(index === 4){
                            //console.log("Chance: Bank pays Player 1 $50");
                            Player2.cash = Player2.cash + 50;
                        }
                        else if(index === 5){
                            //console.log("Chance: Get out of jail free!");
                        }
                        else if(index === 6){
                            //console.log("Chance: Player 2 moves back 3 spaces!")
                            Player2.currentPosition = Player2.currentPosition - 3;
                        }
                        else if(index === 7){
                            //console.log("Chance: Player 2 goes to jail!");
                            Player2.jailed = true;
                            Player2Turn = false;
                            Player2Turn = true;
                        }
                        else if(index === 8){
                            //console.log("Chance: Player 2 pays for general repairs on all property")
                            let payPrice = (Player2.property.length * 25);
                            if (Player2.cash >= payPrice){
                                Player2.cash = Player2.cash - payPrice;
                            }
                            else{
                                while(Player2.cash <= payPrice){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - payPrice;
                            }
                        }
                        else if(index === 9){
                            //console.log("Chance: Pay poor tax!")
                            if (Player2.cash >= 15){
                                Player2.cash = Player2.cash - 15;
                            }
                            else{
                                while(Player2.cash <= 15){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - 15;
                            }
                        }
                        else if(index === 10){
                            //console.log("Chance: Player 2 moves to Reading Railroad");
                            Player2.currentPosition = 5;
                        }
                        else if(index === 11){
                            //console.log("Chance: Player 2 moves to Boardwalk");
                            Player2.currentPosition = 39;
                        }
                        else if(index === 12){
                            //console.log("Chance: Player 2 is chairman of the board")
                            if (Player2.cash >= 50){
                                Player2.cash = Player2.cash - 50;
                                Player1.cash = Player1.cash + 50;
                            }
                            else{
                                while(Player2.cash <= 50){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - 50;
                                Player1.cash = Player1.cash + 50;
                            }
                        }
                        else if (index === 13){
                            //console.log("Chance: Player 2's building and loan matures")
                            Player2.cash = Player2.cash + 150;
                        }
                        else if(index === 14){
                            //console.log("Chance: Player 2 has won a crossword competition");
                                Player2.cash = Player2.cash + 100;
                        }
                        else if(index === 15){
                            //console.log("Chance: Player 2 advances to Go!" );
                            Player2.currentPosition = 0;
                        }
                    }
                    if(board[Player2.currentPosition].index === 2 || board[Player2.currentPosition].index === 17 || board[Player2.currentPosition].index === 33){
                        let index = Math.floor(Math.random() * ccDeck.length);
                        if(index === 0){
                            //console.log("Community Chest: Player 2 moves to Go");
                            Player2.currentPosition = 0;
                        }
                        else if(index === 1){
                            //console.log("Community Chest: Bank error in Player 2's favor");
                            Player2.cash = Player2.cash + 200;
                        }
                        else if(index === 2){
                            //console.log("Community Chest: Player 2 has doctor's fees");
                            if (Player2.cash >= 50){
                                Player2.cash = Player2.cash - 50;
                            }
                            else{
                                while(Player2.cash <= 50){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - 50;
                            }
                        }
                        else if(index === 3){
                            //console.log("Community Chest: Player 2 receives $50 from sale of stock");
                            Player2.cash = Player2.cash + 50;
                        }
                        else if(index === 4){
                            //console.log("Community Chest: Get out of jail free!");
                        }
                        else if(index === 5){
                            //console.log("Community Chest: Player 2 goes to jail!");
                            Player2.jailed = true;
                            Player2Turn = false;
                            Player1Turn = true;
                        }
                        else if(index === 6){
                            //console.log("Community Chest: Player 2 has a grand opera night and collects $50");
                            Player2.cash = Player2.cash + 50;
                        }
                        else if(index === 7){
                            //console.log("Community Chest: Player 2's Holiday fund matures");
                            Player2.cash = Player2.cash + 100;
                        }
                        else if(index === 8){
                            //console.log("Community Chest: Player 2 income tax refund");
                            Player2.cash = Player2.cash + 20;
                        }
                        else if(index === 9){
                            //console.log("Community Chest: Player 2 has a birthday");
                            Player2.cash = Player2.cash + 10;
                        }
                        else if(index === 10){
                            //console.log("Community Chest: Player 2's life insurance matures!");
                            Player2.cash = Player2.cash + 100;
                        }
                        else if(index === 11 || index === 12){
                            if(index === 11){
                                //console.log("Community Chest: Hospital Fees");
                            }
                            if(index === 12){
                                //console.log("School Fees")
                            }
                            if (Player2.cash >= 50){
                                Player2.cash = Player2.cash - 50;
                            }
                            else{
                                while(Player2.cash <= 50){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - 50;
                            }
                        }
                        else if(index === 13){
                            //console.log("Community Chest: Player 2 receives $25 consultancy fee");
                            Player2.cash = Player2.cash + 25;
                        }
                        else if(index === 14){
                            //console.log("Community Chest: Player 2 is assessed for street repairs");
                            let payPrice = Player2.property.length * 40;
                            if (Player2.cash >= payPrice){
                                Player2.cash = Player2.cash - payPrice;
                            }
                            else{
                                while(Player2.cash <= payPrice){
                                    if(Player2.property.length > 0){
                                        Player2.mortgaged.push(Player2.property[0]);
                                        Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                        Player2.property.shift();
                                    }
                                    else{
                                        //console.log("Game Over");
                                        Player2Turn = false;
                                        break;
                                    }
                                }
                                Player2.cash = Player2.cash - payPrice;
                            }
                        }
                        else if(index === 15){
                            //console.log("Community Chest: Player 2 has won second place in a beauty contest");
                            Player2.cash = Player2.cash + 10;
                        }
                        else if(index === 15){
                            //console.log("Community Chest: Player 2 inherits $100");
                            Player2.cash = Player2.cash + 100;
                        }
                    }
                    if(board[Player2.currentPosition].owner === Player1.name){
                        if(Player2.cash >= board[Player2.currentPosition].rent){
                            Player2.cash = Player2.cash - board[Player2.currentPosition].rent;
                            Player1.cash = Player1.cash + board[Player2.currentPosition].rent;
                            //console.log("Player 2 Pays Player 1 $" + board[Player2.currentPosition].rent + " for landing on " + board[Player2.currentPosition].name);
                        }
                        else{
                            while(Player2.cash < board[Player1.currentPosition].rent){
                                if(Player2.property.length > 1){
                                    //console.log("Player 1 mortaged property " + Player2.property[0].name + " for $" + Player2.property[0].mortgage + " going from $" + Player2.cash + " to $" + (Player2.cash + Player2.property[0].mortgage));
                                    Player2.cash = Player2.cash + Player2.property[0].mortgage;
                                    Player2.mortgaged.push(Player2.property[0]);
                                    Player2.property.shift();
                                    //console.log(Player2.cash);
                                }
                                else{
                                    //console.log("Game Over");
                                    GameOver = true;
                                    Player2Turn = false;
                                    break;
                                }
                            }
                            Player2.cash = Player2.cash - board[Player2.currentPosition].rent;
                            Player1.cash = Player1.cash + board[Player2.currentPosition].rent;
                            //console.log("Player 2 Pays Player 1 $" + board[Player2.currentPosition].rent + " for landing on " + board[Player2.currentPosition].name);
                        }
                    }
                    if(!roll.doubleRoll){
                        Player2.thriceCount = 0;
                        Player2Turn = false;
                        Player1Turn = true;
                    }
                    if(roll.doubleRoll){
                        Player2.thriceCount = Player2.thriceCount + 1;
                        if (Player2.thriceCount === 3){
                            Player2.jailed = true;
                            Player2Turn = false;
                            Player1Turn = true;
                        }
                    }
                }
            }
            //console.log();
            //console.log("TURN " + turns);
            turns++;

        }
        //console.log(board);
        //console.log(Player1);
        //console.log(Player2);

    }

    function RunSimulation(count){
        setIsLoading(true);
        setButtonDisabled(!buttonDisabled);
        for(let i = 0; i < count; i++){
            PlayGame();
            board = Board;
        }
        let finalResults = []
        //console.log("FINAL RESULTS");
        board.forEach(item=>{
            finalResults.push({name: item.name, count: item.count});
            
        })
        finalResults.sort(function(a, b){return b.count-a.count});
        console.log(finalResults);
        setResults(finalResults);

        setIsLoading(false);
        let finalNames = [];
        let finalPropCount = [];
        for(let i = 0; i < finalResults.length; i++){
            finalNames.push(finalResults[i].name);
            finalPropCount.push(finalResults[i].count);
        }
        console.log("NAMES", finalNames);
        setFinalProperties(finalNames);
        setFinalCount(finalPropCount);
    }

    const [results, setResults] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [finalProperties, setFinalProperties] = useState([]);
    const [finalCount, setFinalCount] = useState([]);
    const [dropdownOpen, setDropdown] = useState(false);
    return(
        <div className="GamePage">
            <div className="imgWrapper">
                <img src={HomePageBoard} />
                <img id="loadspinner" className={isLoading ? null : "hidden"} src={Loading} />
                <div className={buttonDisabled ? "buttonSelection" : "hidden"}>
                    <a href="#results">See the Results</a>
                    <a onClick={()=>{window.location.reload(false)}}>Restart the Simluation</a>
                </div>
                <a className={buttonDisabled ? "hidden" : "startButton"}onClick={()=>{RunSimulation(1)}}>Start The Game</a>
            </div>
            <div className={buttonDisabled ? "plotWrapper" : "hidden"}> 
                <Plot 
                    data={[
                    {
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: finalProperties, y: finalCount},
                    ]}
                    layout={ {width: 1500, height: 750, title: 'Moponoly Game Results'}}
                    config = {{staticPlot: true}}
                />
            </div>
            <div id="results" className={buttonDisabled ? null : "hidden"}>
                <div className="resultsTitle">
                    <h1>Detailed Results <span onClick={()=>{setDropdown(!dropdownOpen)}}id="dropdownArrow">{dropdownOpen ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}</span></h1> 
                </div>
                <div className={dropdownOpen ? "dropdown" : "hidden"}>
                    {
                        results.map(item=>{
                            return(
                                <div className="resultsLine">
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

export default MoponolyGame;