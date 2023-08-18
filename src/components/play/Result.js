import "../../assets/css/play/result.css";
import fq from "../../assets/img/finalFQ.png";

import { API } from "../../constants";

import React, { useState, useEffect } from "react";
import axios from "axios";

function Result() {
  const [puzzleResult, setPuzzleResult] = useState(""); // word that user have to find out.
  const [pageId, setPageId] = useState(""); // word that user have to find out.
  const [imageURL, setImageURL] = useState(""); // word that user have to find out.
  const [description, setDescription] = useState(""); // word that user have to find out.

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    if (!localStorage.getItem("name")) {
      window.location.href = "/user/signin";
    }
    setPuzzleResult(localStorage.getItem("subject"));
    try {
      const response = await axios.post(
        `${API}/api/questionaire/getDescription`,
        { subject: localStorage.getItem("subject") }
      );
      var data = response.data;
      if (data.success === true) {
        console.log(data);
        setPageId(data.pageId);
        setImageURL(data.image);
        setDescription(data.extract);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const answertip = puzzleResult.split("").map((element) =>
    element === " " ? (
      <div>
        <div className="word-space"></div>
      </div>
    ) : (
      <div className="answer-letter">{element}</div>
    )
  );

  return (
    <div className="content-format">
      <div className="inner-explaination">
        <div>
          <img src={fq} alt="" className="header-title" />
        </div>
        <div className="answer-header">
          <p className="main-font answer-name">answer</p>
          <div className="answer-containers">{answertip}</div>
        </div>
        <div className="result-description answer-description">
          <img alt="" src={imageURL} className="answer-img" />
          <p className="main-font description">
            {description}{" "}
            <a
              href={"https://en.wikipedia.org/w/index.php?curid=" + pageId}
              target="_blank"
              rel="noreferrer"
              className="widipedia-link"
            >
              widipedia
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
