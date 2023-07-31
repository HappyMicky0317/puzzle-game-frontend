import '../../assets/css/explaination/explaination.css';

import React, { useState, useEffect, useRef } from 'react';

import title from "../../assets/video/videoLogo.mp4";
import dice from "../../assets/img/dice.png";

function Explaination() {
  const vidRef=useRef();
  useEffect(() => { vidRef.current.play(); },[]);
  return(
    <div className='content-format'>
        <div className='inner-explaination'>
          <div style={{textAlign:"center"}} className='logo-part'>
            <video controls style={{width:"300px"}} id="video-bg" muted ref={ vidRef } loop>
              <source src={title} type="video/mp4" />
            </video>
          </div>
          <h3 style={{marginTop:"50px"}}>how to play</h3>
          <div className='main-description'>
              <p className='main-font description'>Each day there is a mystery answer that you must solve. You begin by rolling the dice.
              The face value of the dice will determine the number of bonus clues revealed to help you solve the mystery. You will have 10 additional     pportunities to ask a question that assist you in deducting the answer. You have 10 minutes to decipher the answer. You can obtain a bonus clue by watching a video ad which will reveal the category in which the mystery answer belongs to: i.e. movie celebrity, product, place, etc.</p>
          </div>
          <img src={dice} alt="" className='dice-img' />
        </div>
    </div>
  )
}

export default Explaination;