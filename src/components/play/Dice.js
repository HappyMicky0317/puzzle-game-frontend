import "../../assets/css/play/dice.css";
// import dice from "../../assets/img/dice.png";
import rightArrow from "../../assets/img/right-arrow.png";
import React, { useEffect, useState } from 'react';

function Dice() {

    const [diceTwo, setDiceTwo] = useState(1);
    const [rolledResult, setRolledResult] = useState(1);

    const rollDice = () => {
        const newDiceTwo = Math.floor(Math.random() * 6) + 1;
        setDiceTwo(newDiceTwo);
        if(newDiceTwo === 1){
            setRolledResult(1);
        } else if(newDiceTwo === 2){
            setRolledResult(5);
        } else if(newDiceTwo === 3){
            setRolledResult(6);            
        } else if(newDiceTwo === 4){
            setRolledResult(3);            
        } else if(newDiceTwo === 5){
            setRolledResult(4);            
        } else if(newDiceTwo === 6){
            setRolledResult(2);            
        }
        
    };

    return (
        <div className="content-format">
            <div className="dice-inner">
                <h3 style={{ marginTop: "50px" }}>Get bonus clues by rolling dice.</h3>
                <div id="dice2" className={`dice dice-two show-${diceTwo}`}>
                    <div id="dice-two-side-one" className="side one">
                        <div className="dot one-1"></div>
                    </div>
                    <div id="dice-two-side-two" className="side two">
                        <div className="dot two-1"></div>
                        <div className="dot two-2"></div>
                    </div>
                    <div id="dice-two-side-three" className="side three">
                        <div className="dot three-1"></div>
                        <div className="dot three-2"></div>
                        <div className="dot three-3"></div>
                    </div>
                    <div id="dice-two-side-four" className="side four">
                        <div className="dot four-1"></div>
                        <div className="dot four-2"></div>
                        <div className="dot four-3"></div>
                        <div className="dot four-4"></div>
                    </div>
                    <div id="dice-two-side-five" className="side five">
                        <div className="dot five-1"></div>
                        <div className="dot five-2"></div>
                        <div className="dot five-3"></div>
                        <div className="dot five-4"></div>
                        <div className="dot five-5"></div>
                    </div>
                    <div id="dice-two-side-six" className="side six">
                        <div className="dot six-1"></div>
                        <div className="dot six-2"></div>
                        <div className="dot six-3"></div>
                        <div className="dot six-4"></div>
                        <div className="dot six-5"></div>
                        <div className="dot six-6"></div>
                    </div>
                </div>
                <div id="roll" className="roll-button">
                    <button onClick={rollDice}>Roll dice!</button>
                </div>  
                <div style={{marginTop:"130px"}}>
                    <a href={"/play/" + rolledResult} className="next-link">find answers <img src={rightArrow} alt="" /> </a>
                </div>
            </div>
        </div>
    )
}

export default Dice;