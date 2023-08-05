import '../../assets/css/explaination/explaination.css';

import React, { useState, useEffect, useRef } from 'react';

import title from "../../assets/video/videoLogo.mp4";
import dice from "../../assets/img/dice.png";

function Explaination() {
  const vidRef=useRef();
  useEffect(() => { vidRef.current.play(); },[]);

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const inputText = `each day there is a mystery answer that you must solve. you begin by rolling the dice.
  the face value of the dice will determine the number of bonus clues revealed to help you solve the mystery. you will have 10 additional  opportunities to ask a question that assist you in deducting the answer. you have 10 minutes to decipher the answer. you can obtain a bonus clue by watching a video ad which will reveal the category in which the mystery answer belongs to: i.e. movie celebrity, product, place, etc.`;

  useEffect(() => {
    if (index < inputText.length) {
      const timer = setInterval(() => {
        setText((prevText) => prevText + inputText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 30); // Adjust the interval to control the typing speed

      return () => {
        clearInterval(timer);
      };
    }
  }, [index]);

  return(
    <div className='content-format'>
        <div className='inner-explaination'>
          <div style={{textAlign:"center"}} className='logo-part'>
            <video controls style={{width:"300px"}} id="video-bg" muted ref={ vidRef } loop>
              <source src={title} type="video/mp4" />
            </video>
          </div>
          <h3 style={{marginTop:"20px"}}>how to play</h3>
          <div className='main-description'>
              <p className='main-font description'>{text}</p>              
          </div>
          <img src={dice} alt="" className='dice-img' />
        </div>
    </div>
  )
}

export default Explaination;