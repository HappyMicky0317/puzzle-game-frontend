import "../../assets/css/play/mainPlay.css";
import AnswerIcon from "../include/AnswerIcon";

import dicePanel from "../../assets/img/dice-panel.png";
import questionIcon from "../../assets/img/question-icon.png";
import rightArrow from "../../assets/img/right-arrow.png";
import blankAnswer from "../../assets/img/blank-answer-icon.png";

import { API } from '../../constants';

import useCountdown from "../../hook/useCountdown";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function MainPlay() {
    // for control timers
    const [minutes1, setMinutes1] = useState(1);
    const [minutes2, setMinutes2] = useState(0);
    const [seconds1, setSeconds1] = useState(0);
    const [seconds2, setSeconds2] = useState(0);
    const [activeAsk, setActiveAsk] = useState(true); // for control state of asking
    const [inputValudate, setInputValudate] = useState(false);
    
    const [resultMessage, setResultMessage] = useState("");
    const [timeUpMessage, setTimeUpMessage] = useState("");
    const [allAskedMessage, setAllAskedMEssage] = useState("");

    const [puzzleResult, setPuzzleResult] = useState("");    // word that user have to find out.
    const [category, setCategory] = useState("")  // category of result
    const [newQuestion, setNewQusetion] = useState("");   // temp variable that new questions user input
    const [questionCounter, setQuestionCounter] = useState(0);   // counter integer that number of user asked.

    const timer = useCountdown(599);
    useEffect(()=>{
        var tempMin1 = minutes1;
        var tempMin2 = minutes2;
        var tempSec1 = seconds1;
        var tempSec2 = seconds2;

        tempSec2 = tempSec2 - 1;
        if(tempSec2 == -1){
            tempSec2 = 9;
            tempSec1 = tempSec1 - 1;
            if(tempSec1 == -1) {
                tempSec1 = 5;
                tempMin2 = tempMin2 - 1;
                if(tempMin2 == -1){
                    tempMin2 = 9;
                    tempMin1 = tempMin1 - 1;
                }
            }
        }
        setMinutes1(tempMin1);
        setMinutes2(tempMin2);
        setSeconds1(tempSec1);
        setSeconds2(tempSec2);
        if(tempMin1 == 0 && tempMin2 == 0 && tempSec1 == 0 && tempSec2 == 0){
            setActiveAsk(false);
            setTimeUpMessage("Time is Up!");
        }
    }, [timer])

    const [bonusQ, setBonusQ] = useState([       // bonus clues that user received by rolling dice
        {"question" : "is it alive?", "flag" : "yes"},
        {"question" : "is it human?", "flag" : "yes"},
        {"question" : "is it a man?", "flag" : "no"},
        {"question" : "", "flag" : ""},
        {"question" : "", "flag" : ""},
        {"question" : "", "flag" : ""}
    ]);

    const [userQuestionaire, setUserQuestionaire] = useState({   // all users's input questions
        "part1":[
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""}
        ],
        "part2":[
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""},
            {"question" : "", "flag" : ""}
        ]
    })

    useEffect(() => {
        initial();
    }, []);

    const initial = async () => {
        try {
            // ss
            const response = await axios.post(`${API}/api/questionaire/subject`);
            const res_data = response.data
            if(res_data.success === false) {
                alert(res_data.message)
            } else {
                setPuzzleResult(res_data.results[0].subject_name);
                setCategory(res_data.results[0].category_name);
            }
            console.log(puzzleResult);
            // alert(JSON.stringify(res_data.results[0].category_name));
        } catch (error) {
            console.log(error);
        }
    }

    const askInput = (e) => {
        setNewQusetion(e.target.value);
        if(newQuestion != ""){
            setInputValudate(false)
        }
    }

    const askTo = async () => {
        if(newQuestion == "" || activeAsk == false){
            setInputValudate(true);
            return;
        }

        try {
            const response = await axios.post(`${API}/api/questionaire/asking`, {subject : puzzleResult, question:newQuestion });
            var answer = response.data.answer;
            answer = answer.replaceAll("\n", "");
            console.log(answer);

            var tempQuestionaire = userQuestionaire;   
            var tempCounter = questionCounter;
            if(tempCounter < 5){
                tempQuestionaire.part1[tempCounter].question = newQuestion;
                tempQuestionaire.part1[tempCounter].flag = answer;
            } else {
                tempQuestionaire.part2[tempCounter-5].question = newQuestion;
                tempQuestionaire.part2[tempCounter-5].flag = answer;
            }

            setQuestionCounter(tempCounter + 1);
            if(tempCounter == 10){
                setActiveAsk(false);
                setAllAskedMEssage("You can't ask aymore! Please input your answer.")
            }
            // setUserQuestionaire(tempQuestionaire);
            setNewQusetion("");
            console.log(userQuestionaire);
        } catch (error) {
            console.log(error);
        }               
        
    }

    const getResult = async() => {
        var length = puzzleResult.length;
        console.log(length);
        var user_input = ""
        for(var i = 0 ; i < length ; i++){
            if(document.getElementById("input" + i).value != ""){
                user_input = user_input + document.getElementById("input" + i).value;
            } else {
                user_input = user_input + " ";
            }
        }
        if(user_input.toLowerCase() == puzzleResult.toLowerCase()){
            setResultMessage("Correct answer!")
        } else {
            setResultMessage("Incorrect Answer!");
        }
        setActiveAsk(false)
        console.log(user_input);
        // var input = document.getElementById("")
        // localStorage.setItem("subject", puzzleResult);
        // window.location.href = "/result"

    }

    const bonus_question = bonusQ.map((index, num) => (
        <div className="per-clues">
            <div>
                <p className='main-font' style={{marginTop:"10px"}}>{num + 1}. {index.question}</p>
            </div>
            <div>
                {index.flag === "" ? <img src={questionIcon} alt="" /> : <AnswerIcon correctness={index.flag} />}
                
            </div>
        </div>  
    ))

    const user_questionaire1 = userQuestionaire.part1.map((index, num) => (
        <div className="per-clues">
            <div>
                <p className='main-font' style={{marginTop:"10px"}}>{num + 1}. {index.question}</p>
            </div>
            <div>
                {index.flag === "" ? "" : <AnswerIcon correctness={index.flag} />}                
            </div>
        </div>  
    ))
    const user_questionaire2 = userQuestionaire.part2.map((index, num) => (
        <div className="per-clues">
            <div>
                <p className='main-font' style={{marginTop:"10px"}}>{num + 6}. {index.question}</p>
            </div>
            <div>
                {index.flag === "" ? "" : <AnswerIcon correctness={index.flag} />}                
            </div>
        </div>  
    ))

    // making and hangle user inputs
    const inputRefs = useRef([]);

    const handleKeyDown = (event, index) => {
        if (event.target.value.length === 1) {
        event.preventDefault();
        inputRefs.current[index + 1]?.focus();
        }
    };
    const answertip = puzzleResult.split("").map((element, num) => (
        element == " " ? <div>
            <div style={{width:"30px"}}>
                <input
                    id={"input" + num}
                    maxLength={1}
                    ref={(el) => (inputRefs.current[num] = el)}
                    onInput={(event) => handleKeyDown(event, num)} style={{width:"40px",marginLeft:"3px",display:"none"}}
                />
            </div>
        </div>
        :
        <div>
            {/* <img src={blankAnswer} alt="" /> */}
            <input
                id={"input" + num}
                maxLength={1}
                ref={(el) => (inputRefs.current[num] = el)}
                onInput={(event) => handleKeyDown(event, num)} style={{width:"40px",marginLeft:"3px"}}
            />
            {/* <input type="text" maxlength="1" /> */}
        </div>
    ));
    ////////////////////////////////////////////////
   
    return(
        <div className="mainplay-content">
            <div className="mainPlay-inner">
                <div className="main-left">
                    <img src={dicePanel} alt="" />
                    <div className="bonusQ-header">
                        <h4>bonus q's</h4>
                    </div>
                    <div className="bonus-cluses-container">
                        {
                            bonus_question  
                        }     
                        <div className="per-clues" style={{marginTop:"40px"}}>
                            <div>
                                <p style={{marginTop:"0px",width:"90%",textAlign:"left"}}>watch a video ad and get a category clue.</p>
                            </div>
                            <div>
                                <AnswerIcon correctness="yes" />
                            </div>
                        </div>  
                        <div className="per-clues" style={{marginTop:"40px"}}>
                            <div className="category-container">
                                <div style={{width:"fit-content",margin:"auto"}}>
                                    <div className="category-top">
                                        <img src={rightArrow} alt="" className='home-arrow-img' />
                                        <p className='main-font' style={{marginTop:"-2px",marginLeft:"10px"}}>category</p>
                                    </div>
                                    <h4 style={{marginTop:"5px"}}>{category}</h4>
                                    {puzzleResult}
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>           
                    </div>
                </div>
                <div className="main-right">
                    <div className="timer-container">
                        <div className="timer-head">
                            remaining&nbsp; time
                        </div>
                        <div className="timer">
                            <div className="time-panel">{minutes1}</div>
                            <div className="time-panel">{minutes2}</div>
                            <div className="time-panel">:</div>
                            <div className="time-panel">{seconds1}</div>
                            <div className="time-panel">{seconds2}</div>
                        </div>
                        <p className="warning-content" style={{marginLeft:"70px"}}>{timeUpMessage}</p>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <div className="asking-container">
                            <input className="question-input" value={newQuestion} onChange={askInput} />
                            <div className="ask-btn" onClick={askTo}>
                                <img src={rightArrow} alt="" className='home-arrow-img' /> <span style={{fontWeight:"bold"}}>ask</span>
                            </div>
                        </div>
                        <h2 className="asking-num">{questionCounter}/10</h2>
                    </div>
                    <p className="warning-content" style={{display:inputValudate === true?"block" : "none"}}>input your question</p>
                    <p className="warning-content">{allAskedMessage}</p>
                    <div className="questions-container">
                        <div className="questions-container-inner">
                            {user_questionaire1}
                        </div>
                        <div className="questions-container-padding">
                        </div>
                        <div className="questions-container-inner">
                            {user_questionaire2}
                        </div>
                    </div>
                    <p className="warning-content" style={{marginLeft:"70px"}}>{allAskedMessage}</p>
                    <div className="answer-container">
                        <div className="answers">
                            {answertip}
                        </div>
                        <div style={{marginTop:"15px"}}>
                            <div className="ask-btn" onClick={getResult}>
                                <img src={rightArrow} alt="" className='home-arrow-img' /> <span style={{fontWeight:"bold"}}>answer</span>
                            </div>
                        </div>
                    </div>
                    <p className="warning-content" style={{marginLeft:"70px"}}>{resultMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default MainPlay;