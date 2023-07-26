import "../../assets/css/play/dice.css";
import dice from "../../assets/img/dice.png";
import rightArrow from "../../assets/img/right-arrow.png";

function Dice() {
    return(
        <div className="content-format">
            <div className="dice-inner">
                <h3 style={{marginTop:"50px"}}>Get bonus clues by rolling dice.</h3>
                <img src={dice} alt="" className='dice-img' style={{cursor:"pointer"}} />
                <p className='main-font' style={{marginTop:"30px"}}>click on the dice</p>
                <a href="/play" className="next-link">find answers <img src={rightArrow} alt="" /> </a>
            </div>
        </div>
    )
}

export default Dice;