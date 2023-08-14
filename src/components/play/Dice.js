import "../../assets/css/play/dice.css";

import Modal from "../include/Modal";

import { API } from "../../constants";

import rightArrow from "../../assets/img/right-arrow.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
var CryptoJS = require("crypto-js");

function Dice() {
  const [diceTwo, setDiceTwo] = useState(() => {
    const storedDiceTwo = localStorage.getItem("diceTwo");
    return storedDiceTwo ? JSON.parse(storedDiceTwo) : 1;
  });
  const [rolledResult, setRolledResult] = useState(() => {
    const storedRolledResult = localStorage.getItem("rolledResult");
    return storedRolledResult ? JSON.parse(storedRolledResult) : 1;
  });
  const [isDiceRolled, setIsDiceRolled] = useState(() => {
    const storedIsDiceRolled = localStorage.getItem("isDiceRolled");
    return storedIsDiceRolled ? JSON.parse(storedIsDiceRolled) : false;
  });
  const [realResults, setRealResults] = useState(() => {
    const storedRealReaults = localStorage.getItem("realResult");
    return storedRealReaults ? JSON.parse(storedRealReaults) : 1;
  });
  const [showModal, setShowModal] = useState(false);
  const [errorReturned, setErrorReturned] = useState("");

  useEffect(async () => {
    initial();

    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/checkavailable`, {
      email: email,
    });
    if (response.data.success === false) {
      alert(response.data.msg);
    } else if (response.data.success === true) {
      if (response.data.play === true) {
        localStorage.removeItem("diceTwo");
        localStorage.removeItem("realResult");
        localStorage.removeItem("isDiceRolled");
        localStorage.removeItem("rolledResult");
      }
    }
  }, []);

  const initial = async () => {
    if (localStorage.getItem("name") === null) {
      window.location.href = "/user/signin";
    }
  };

  const rollDice = () => {
    initial();
    if (localStorage.getItem("isDiceRolled")) {
      setErrorReturned("You already rolled dice.");
      setShowModal(false);
      setShowModal(true);
    }
    if (!isDiceRolled) {
      const newDiceTwo = Math.floor(Math.random() * 6) + 1;
      setDiceTwo(newDiceTwo);

      let newRolledResult;
      if (newDiceTwo === 1) {
        newRolledResult = 1;
      } else if (newDiceTwo === 2) {
        newRolledResult = 5;
      } else if (newDiceTwo === 3) {
        newRolledResult = 6;
      } else if (newDiceTwo === 4) {
        newRolledResult = 3;
      } else if (newDiceTwo === 5) {
        newRolledResult = 4;
      } else if (newDiceTwo === 6) {
        newRolledResult = 2;
      }

      setRolledResult(newDiceTwo);
      setRealResults(newRolledResult);
      setIsDiceRolled(true);

      localStorage.setItem("realResult", newRolledResult);
      localStorage.setItem("diceTwo", newDiceTwo);
      localStorage.setItem("rolledResult", newDiceTwo);
      localStorage.setItem("isDiceRolled", true);

      setTimeout(() => {
        localStorage.clear();
      }, 100 * 60 * 60);
    }
  };

  const play = async () => {
    if (isDiceRolled === false) {
      setErrorReturned("You have to rolled dice firstly.");
      setShowModal(false);
      setShowModal(true);
      return;
    }
    if (localStorage.getItem("name")) {
      var email = localStorage.getItem("email");
      const response = await axios.post(`${API}/api/users/checkavailable`, {
        email: email,
      });
      if (response.data.success === false) {
        alert(response.data.msg);
      } else if (response.data.success === true) {
        if (response.data.play === false) {
          setErrorReturned("You can play only one in a day.");
          setShowModal(false);
          setShowModal(true);
        } else {
        var encrypted = CryptoJS.AES.encrypt(String(realResults), 'youngunicornsrunfree');
        var enc_modified = encrypted.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
          window.location.href = "/play/" + enc_modified;
        }
      }
    } else {
      window.location.href = "/user/signin";
    }
  };

  return (
    <div className="content-format">
      {showModal && <Modal msg={errorReturned} />}
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
        <div style={{ marginTop: "130px" }}>
          <a onClick={play} className="next-link" style={{cursor:"pointer"}}>
            find answers <img src={rightArrow} alt="" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dice;
