import "../../assets/css/play/mainPlay.css";
import AnswerIcon from "../include/AnswerIcon";
import ConfettiAnimation from "../include/ConfettiAnimation";
import Modal from "../include/Modal";
import Loading from "../include/Loading";

import questionIcon from "../../assets/img/question-icon.png";
import rightArrow from "../../assets/img/right-arrow.png";
import dice1 from "../../assets/img/dice1.png";
import dice2 from "../../assets/img/dice2.png";
import dice3 from "../../assets/img/dice3.png";
import dice4 from "../../assets/img/dice4.png";
import dice5 from "../../assets/img/dice5.png";
import dice6 from "../../assets/img/dice6.png";

import { API } from "../../constants";

import useCountdown from "../../hook/useCountdown";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
var CryptoJS = require("crypto-js");

function MainPlay() {
  const { diceResults } = useParams();
  const [bonusClues, setBonusClues] = useState(0);
  const [diceImg, setDiceImg] = useState("");
  const [isConfetti, setIsConfetti] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [dayPlayed, setDayPlayed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [isInputAnswer, setIsInputAnswer] = useState(false);
  // for control timers
  const [minutes1, setMinutes1] = useState(1);
  const [minutes2, setMinutes2] = useState(0);
  const [seconds1, setSeconds1] = useState(0);
  const [seconds2, setSeconds2] = useState(0);
  const [activeAsk, setActiveAsk] = useState(true); // for control state of asking
  const [inputValudate, setInputValudate] = useState(false);
  // modal management
  const [showModal, setShowModal] = useState(false);
  const [errorReturned, setErrorReturned] = useState("");

  const [resultMessage, setResultMessage] = useState("");
  const [timeUpMessage, setTimeUpMessage] = useState("");
  const [allAskedMessage, setAllAskedMEssage] = useState("");

  const [puzzleResult, setPuzzleResult] = useState(""); // word that user have to find out.
  const [category, setCategory] = useState(""); // category of result
  const [newQuestion, setNewQusetion] = useState(""); // temp variable that new questions user input
  const [questionCounter, setQuestionCounter] = useState(0); // counter integer that number of user asked.

  const timer = useCountdown(599);
  useEffect(() => {
    if (!isAnswered) {
      var tempMin1 = minutes1;
      var tempMin2 = minutes2;
      var tempSec1 = seconds1;
      var tempSec2 = seconds2;

      tempSec2 = tempSec2 - 1;
      if (tempSec2 === -1) {
        tempSec2 = 9;
        tempSec1 = tempSec1 - 1;
        if (tempSec1 === -1) {
          tempSec1 = 5;
          tempMin2 = tempMin2 - 1;
          if (tempMin2 === -1) {
            tempMin2 = 9;
            tempMin1 = tempMin1 - 1;
          }
        }
      }
      setMinutes1(tempMin1);
      setMinutes2(tempMin2);
      setSeconds1(tempSec1);
      setSeconds2(tempSec2);
      if (tempMin1 === 0 && tempMin2 === 0 && tempSec1 === 0 && tempSec2 === 0) {
        setActiveAsk(false);
        setTimeUpMessage("Time is Up!");
        setIsAnswered(true);
      }
    }
  }, [timer]);

  const [bonusQ, setBonusQ] = useState([
    // bonus clues that user received by rolling dice
    { question: "", flag: "" },
    { question: "", flag: "" },
    { question: "", flag: "" },
    { question: "", flag: "" },
    { question: "", flag: "" },
    { question: "", flag: "" },
  ]);
  const [userQuestionaire, setUserQuestionaire] = useState({
    // all users's input questions
    part1: [
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
    ],
    part2: [
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
      { question: "", flag: "" },
    ],
  });

  useEffect(() => {
    checkAvailable();
    initial();
  }, []);

  const initial = async () => {
    if (!localStorage.getItem("name")) {
      window.location.href = "/user/signin";
    }

    // getting dice result
    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/checkdiceAvailable`, {
      email: email,
    });
    setBonusClues(parseInt(response.data.previous_val));

    // set header dice image
    if (parseInt(response.data.previous_val) === 1) {
      setDiceImg(dice1);
    } else if (parseInt(response.data.previous_val) === 2) {
      setDiceImg(dice2);
    } else if (parseInt(response.data.previous_val) === 3) {
      setDiceImg(dice3);
    } else if (parseInt(response.data.previous_val) === 4) {
      setDiceImg(dice4);
    } else if (parseInt(response.data.previous_val) === 5) {
      setDiceImg(dice5);
    } else if (parseInt(response.data.previous_val) === 6) {
      setDiceImg(dice6);
    }

    // getting bonus questions
    var data = {
      num: parseInt(response.data.previous_val),
      email: localStorage.getItem("email")
    };
    try {
      const response = await axios.post(
        `${API}/api/questionaire/subject`,
        data
      );
      const res_data = response.data;
      if (res_data.success === false) {
        alert(res_data.message);
      } else {
        setPuzzleResult(res_data.subject);
        setCategory(res_data.category);
        var bonus = res_data.clues;
        var temp = [
          { question: "", flag: "" },
          { question: "", flag: "" },
          { question: "", flag: "" },
          { question: "", flag: "" },
          { question: "", flag: "" },
          { question: "", flag: "" },
        ];
        for (var i = 0; i < bonus.length; i++) {
          temp[i].question = bonus[i].question;
          temp[i].flag = bonus[i].answer;
        }
        setBonusQ(temp);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const checkAvailable = async () => {
    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/checkavailable`, {
      email: email,
    });
    if (response.data.success === false) {
      alert(response.data.msg);
    } else if (response.data.success === true) {
      if (response.data.play === false) {
        setDayPlayed(false);
        setIsAnswered(true);
      }
    }
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const askInput = (e) => {
    setNewQusetion(e.target.value);
    if (newQuestion !== "") {
      setInputValudate(false);
    }
  };

  const askKeyPress = (e) => {
    if (e.key === "Enter") {
      askTo();
    }
  };

  const askTo = async () => {
    if (newQuestion === "" || activeAsk === false) {
      setInputValudate(true);
      return;
    }
    if (questionCounter === 10) {
      setErrorReturned("You already asked 10 questions.");
      setShowModal(false);
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(`${API}/api/questionaire/asking`, {
        subject: puzzleResult,
        question: newQuestion,
      });
      var answer = response.data;
      if (answer.slice(0, 1) === "Y") answer = "Yes";
      else answer = "No";

      var tempQuestionaire = userQuestionaire;
      var tempCounter = questionCounter;
      if (tempCounter < 5) {
        tempQuestionaire.part1[tempCounter].question = newQuestion;
        tempQuestionaire.part1[tempCounter].flag = answer;
      } else {
        tempQuestionaire.part2[tempCounter - 5].question = newQuestion;
        tempQuestionaire.part2[tempCounter - 5].flag = answer;
      }

      setQuestionCounter(tempCounter + 1);
      if (tempCounter === 10) {
        setActiveAsk(false);
        setAllAskedMEssage("You can't ask anymore! Please input your answer.");
      }
      setNewQusetion("");
    } catch (error) {
      console.log(error);
    }
  };

  const getResult = async () => {
    var score = 0;
    if (isAnswered === false) {
      var length = puzzleResult.length;
      var user_input = "";
      for (var i = 0; i < length; i++) {
        if (document.getElementById("input" + i).value !== "") {
          user_input = user_input + document.getElementById("input" + i).value;
        } else {
          user_input = user_input + " ";
        }
      }
      if (user_input.toLowerCase() === puzzleResult.toLowerCase()) {
        setResultMessage("Correct answer!");
        setIsConfetti(true);
        score = 10 * bonusClues;
      } else {
        if (user_input.trim().length === 0) {
          setResultMessage("Input your answer!");
          return;
        } else {
          setResultMessage("Incorrect Answer!");
        }
      }
      setActiveAsk(false);
      setIsAnswered(true);
      const response = await axios.post(
        `${API}/api/questionaire/insertresult`,
        { score: score, email: localStorage.getItem("email") }
      );
      if (response.data.success === false) {
        alert(response.data.msg);
      }
    } else {
      localStorage.setItem("subject", puzzleResult);
      window.location.href = "/result";
    }
  };
  const bonus_question = bonusQ.map((index, num) => (
    <div className="per-clues">
      <div style={{ textAlign: "left" }}>
        <p className="main-font" style={{ marginTop: "10px" }}>
          {num + 1}. {index.question}
        </p>
      </div>
      <div>
        {index.flag === "" ? (
          <img src={questionIcon} alt="" />
        ) : (
          <AnswerIcon correctness={index.flag} />
        )}
      </div>
    </div>
  ));

  const user_questionaire1 = userQuestionaire.part1.map((index, num) => (
    <div className="per-clues">
      <div>
        <p className="main-font" style={{ marginTop: "10px" }}>
          {num + 1}. {index.question}
        </p>
      </div>
      <div>
        {index.flag === "" ? "" : <AnswerIcon correctness={index.flag} />}
      </div>
    </div>
  ));
  const user_questionaire2 = userQuestionaire.part2.map((index, num) => (
    <div className="per-clues">
      <div>
        <p className="main-font" style={{ marginTop: "10px" }}>
          {num + 6}. {index.question}
        </p>
      </div>
      <div>
        {index.flag === "" ? "" : <AnswerIcon correctness={index.flag} />}
      </div>
    </div>
  ));

  // handle user inputs
  const inputRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    if (event.target.value.length === 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };
  const answertip = puzzleResult.split("").map((element, num) =>
    element === " " ? (
      <div>
        <div className="word-space">
          <input
            id={"input" + num}
            maxLength={1}
            ref={(el) => (inputRefs.current[num] = el)}
            onInput={(event) => handleKeyDown(event, num)}
            className="user-input"
            style={{ display: "none" }}
          />
        </div>
      </div>
    ) : (
      <div>
        {/* <img src={blankAnswer} alt="" /> */}
        <input
          id={"input" + num}
          maxLength={1}
          ref={(el) => (inputRefs.current[num] = el)}
          onInput={(event) => handleKeyDown(event, num)}
          className="user-input"
        />
        {/* <input type="text" maxlength="1" /> */}
      </div>
    )
  );
  ////////////////////////////////////////////////

  return (
    <div>
      {isLoading ?
        <Loading />
        :
        <div>
          <div
            className="alert-container"
            style={{ display: dayPlayed ? "none" : "block" }}
          >
            <div className="main-alert">You can Play only one in a day</div>
            <div
              className="home-link"
              onClick={goHome}
              style={{ margin: "auto", marginTop: "25px" }}
            >
              <img src={rightArrow} alt="" className="home-arrow-img" />
              <p className="main-font default-padding" style={{ color: "white" }}>
                Home
              </p>
            </div>
          </div>
          <div className="mainplay-content">
            {showModal && <Modal msg={errorReturned} />}
            <div className="mainPlay-inner">
              <div className="main-left">
                <img src={diceImg} alt="" className="dice-clue-img" />
                <div className="bonusQ-header">
                  <h4>bonus q's</h4>
                </div>
                <div className="bonus-cluses-container">
                  {bonus_question}
                  <div className="per-clues" style={{ marginTop: "40px" }}>
                    <div>
                      <p
                        style={{
                          marginTop: "0px",
                          width: "90%",
                          textAlign: "left",
                        }}
                      >
                        watch a video ad and get a category clue.
                      </p>
                    </div>
                    <div>
                      <AnswerIcon correctness="yes" />
                    </div>
                  </div>
                  <div className="per-clues" style={{ marginTop: "40px" }}>
                    <div className="category-container">
                      <div style={{ width: "fit-content", margin: "auto" }}>
                        <div className="category-top">
                          <img src={rightArrow} alt="" className="home-arrow-img" />
                          <p
                            className="main-font"
                            style={{ marginTop: "-2px", marginLeft: "10px" }}
                          >
                            category
                          </p>
                        </div>
                        <h4 style={{ marginTop: "5px" }}>{category}</h4>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="main-right">
                <div className="timer-container">
                  <div className="timer-head">remaining&nbsp; time</div>
                  <div className="timer">
                    <div className="time-panel">{minutes1}</div>
                    <div className="time-panel">{minutes2}</div>
                    <div className="time-panel">:</div>
                    <div className="time-panel">{seconds1}</div>
                    <div className="time-panel">{seconds2}</div>
                  </div>
                  <p className="warning-content" style={{ marginLeft: "70px" }}>
                    {timeUpMessage}
                  </p>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="asking-container" style={{ cursor: isAnswered ? "not-allowed" : "auto" }}>
                    <input
                      className="question-input"
                      value={newQuestion}
                      onChange={askInput}
                      onKeyDown={askKeyPress}
                      // disabled

                      style={{ pointerEvents: isAnswered ? "none" : "all" }}
                    />
                    <div className="ask-btn" onClick={askTo}>
                      <img src={rightArrow} alt="" className="home-arrow-img" />{" "}
                      <span style={{ fontWeight: "bold" }}>ask</span>
                    </div>
                  </div>
                  <h2 className="asking-num">{questionCounter}/10</h2>
                </div>
                <p
                  className="warning-content"
                  style={{ display: inputValudate === true ? "block" : "none" }}
                >
                  input your question
                </p>
                <p className="warning-content">{allAskedMessage}</p>
                <div className="questions-container">
                  <div className="questions-container-inner">
                    {user_questionaire1}
                  </div>
                  <div className="questions-container-padding"></div>
                  <div className="questions-container-inner">
                    {user_questionaire2}
                  </div>
                </div>
                <p className="warning-content" style={{ marginLeft: "70px" }}>
                  {allAskedMessage}
                </p>
                <div className="answer-container">
                  <div className="answers">{answertip}</div>
                  <div style={{ marginTop: "15px" }}>
                    <div className="ask-btn" onClick={getResult}>
                      <img src={rightArrow} alt="" className="home-arrow-img" />{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {isAnswered
                          ? "Description from Wikipedia"
                          : "Check your answer"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="warning-content" style={{ marginLeft: "70px" }}>
                  {resultMessage}
                </p>
              </div>
            </div>
            {isConfetti && <ConfettiAnimation />}
          </div>
        </div>
      }
    </div>
  );
}

export default MainPlay;
