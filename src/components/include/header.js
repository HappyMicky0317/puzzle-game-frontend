import React, { useState, useEffect, useRef } from 'react';

import '../../assets/css/include/header.css';
import logo from "../../assets/img/logo.png";
import rightArrow from "../../assets/img/right-arrow.png";
import menuIcon from "../../assets/img/menu-icon.png"

function Header(props) {
  const [isMenu, setIsMenu] = useState(false)
  const ref = useRef(null);

  const menuClick = () =>{
    var temp = !isMenu;
    setIsMenu(temp);
    console.log(isMenu)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      const x = e.pageX;
      const y = e.pageY;
      const rect = ref.current.getBoundingClientRect();
      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        console.log('Click occurred inside the target div');
        return;
      }
      setIsMenu(false);
    }
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (
    <div className="inside-header">
      <div className="header-content">
        <div className='header-left'>
          <img src={logo} alt="" className="main-logo" />
          <div className='home-link'>
            <img src={rightArrow} alt="" className='home-arrow-img' />
            <p className='main-font default-padding' style={{color:"white"}}>Home</p>
          </div>
        </div>  
        <div ref={ref}>     
          <div className='header-menu'>
            <p className='main-font default-padding' style={{color:"white"}}>menu</p>
            <img src={menuIcon} alt="" className='home-menu-img' onClick={menuClick} />
          </div>
          <div id="myDropdown" class="dropdown-content" style={{display:isMenu? "block" : "none"}}>
            <a href="./">Home</a>
            {/* <a href="#about">About</a> */}
            <a href="./howtoplay">How to play</a>
          </div>
        </div>   
      </div>
    </div>
  );
}

export default Header;