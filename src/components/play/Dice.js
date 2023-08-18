import "../../assets/css/play/dice.css";

import Modal from "../include/Modal";
import Loading from "../include/Loading";

import { API } from "../../constants";

import rightArrow from "../../assets/img/right-arrow.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dice() {
  const [diceTwo, setDiceTwo] = useState(1);
  const [isDiceRolled, setIsDiceRolled] = useState(false);
  // const [realResults, setRealResults] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [errorReturned, setErrorReturned] = useState("");
  // const [isPlayed, setIsPlayed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      initial();
      checkPlayAvailable();
      var dice_validation = await checkDiceAvailable();
      if (dice_validation.success === false) {
        var previous_val = dice_validation.previous_val;
        previous_val = parseInt(previous_val);
        // setRealResults(previous_val);
        setIsDiceRolled(true);
        if (previous_val === 1) {
          setDiceTwo(1);
        } else if (previous_val === 2) {
          setDiceTwo(6);
        } else if (previous_val === 3) {
          setDiceTwo(4);
        } else if (previous_val === 4) {
          setDiceTwo(5);
        } else if (previous_val === 5) {
          setDiceTwo(2);
        } else if (previous_val === 6) {
          setDiceTwo(3);
        }
      } else {
        // alert("Dffd")
      }

      // var email = localStorage.getItem("email");
      // const response = await axios.post(`${API}/api/users/checkavailable`, {
      //   email: email,
      // });
      // if (response.data.success === false) {
      //   alert(response.data.msg);
      // } else if (response.data.success === true) {
      //   if (response.data.play === true) {
      //     localStorage.removeItem("diceTwo");
      //     localStorage.removeItem("realResult");
      //     localStorage.removeItem("isDiceRolled");
      //   }
      // }
      setIsLoading(false);
    }
    fetch();
  }, []);

  const initial = async () => {
    if (localStorage.getItem("name") === null) {
      window.location.href = "/user/signin";
    }
  };

  const checkPlayAvailable = async () => {
    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/checkavailable`, {
      email: email,
    });
    if (response.data.success === false) {
      alert(response.data.msg);
    } else if (response.data.success === true) {
      if (response.data.play === false) {
        // setIsPlayed(true);
      }
    }
  };

  const checkDiceAvailable = async () => {
    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/checkdiceAvailable`, {
      email: email,
    });
    return response.data;
  }

  const rollDice = async () => {
    initial();
    if (isDiceRolled) {
      setShowModal(false);
      setShowModal(true);
      setErrorReturned("");
      setErrorReturned("You already rolled dice.");
      return;
    }
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

    // setRealResults(newRolledResult);
    setIsDiceRolled(true);
    var email = localStorage.getItem("email");
    const response = await axios.post(`${API}/api/users/insertdiceval`, {
      email: email,
      result: newRolledResult
    });
    if (response.data.success === false) {
      alert(response.data.msg);
      return;
    }
  };

  const play = async () => {
    if (isDiceRolled === false) {
      setErrorReturned("You have to rolled dice firstly.");
      setShowModal(false);
      setShowModal(true);
      return;
    }
    if (localStorage.getItem("email")) {
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
          window.location.href = "/play";
        }
      }
    } else {
      window.location.href = "/user/signin";
    }
  };

  return (
    <div>
      {isLoading ?
        <Loading />
        :
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
              <p onClick={play} className="next-link" style={{ cursor: "pointer" }}>
                find answers <img src={rightArrow} alt="" />
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Dice;
