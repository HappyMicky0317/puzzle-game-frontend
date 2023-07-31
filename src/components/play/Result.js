import "../../assets/css/play/result.css";
import fq from "../../assets/img/finalFQ.png"

import { API } from '../../constants';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Result() {

    const [puzzleResult, setPuzzleResult] = useState("");    // word that user have to find out.
    const [pageId, setPageId] = useState("");    // word that user have to find out.
    const [imageURL, setImageURL] = useState("");    // word that user have to find out.
    const [description, setDescription] = useState("");    // word that user have to find out.

    useEffect(() => {
        initial();
    }, []);

    const initial = async () => {
        // console.log(localStorage.getItem("subject"))
        setPuzzleResult(localStorage.getItem("subject"))
        try {
            const response = await axios.post(`${API}/api/questionaire/getDescription`, {subject : localStorage.getItem("subject")});
            var data = response.data.data
            setPageId(data.pageId);
            setImageURL(data.image);
            setDescription(data.description);
        } catch (error) {
            console.log(error);
        }
    }
    
    const answertip = puzzleResult.split("").map(element => (
        element == " " ? <div>
            <div style={{width:"30px"}}></div>
        </div>
        :
        <div className="answer-letter">{element}</div>
    ));

    return(
        <div className="content-format">
            <div className='inner-explaination'>
                <div>
                    <img src={fq} alt=""  className='header-title' />
                </div>
                <div className="answer-header">
                    <p className='main-font answer-name'>answer</p>
                    <div className="answer-containers">
                        {answertip}
                    </div>
                </div>
                <div className='main-description answer-description'>
                    <img src={imageURL} className="answer-img" />
                    <p className='main-font description'>{description} <a href={"https://en.wikipedia.org/w/index.php?curid=" + pageId} target="_blank" className="widipedia-link">widipedia</a></p>
                </div>
                {/* <img src={dice} alt="" className='dice-img' /> */}
            </div>
        </div>
    )
}

export default Result;