import React from 'react';

import '../../assets/css/home/home.css';
import title from "../../assets/img/header-mainpage.png";
import dice from "../../assets/img/dice.png"

function Home(){
  return(
    <div className="content-format">
      <div style={{textAlign:"center"}}>
        <div style={{textAlign:"center"}}>
          <img src={title} alt="" className='header-title' />
        </div>
        <h3 style={{marginTop:"50px"}}>it's anyone's guess</h3>
        <p className='main-font' style={{marginTop:"50px"}}>each day we'll give you 10 chances to solve our mystery answer.</p>
        <img src={dice} alt="" className='dice-img' />
        <br />
        <a href="/dice" className='main-font play-link'>let's play</a>
      </div>
    </div>
  )
}

export default Home;