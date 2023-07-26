function AnswerIcon(props) {
    const styles = {
        border: "solid 2px #000",
        width: "40px",
        height: "40px",
        backgroundColor:props.correctness === "yes" ? "#18ce2e" : "#f00",
        textAlign: "center",
        display:"flex",
        alignItems:"center",
        borderRadius: "8px"
    };

    return(
        <div style={styles}>
            <p className="main-font" style={{color:"white", margin:"auto"}}>{props.correctness}</p>
        </div>
    )
}

export default AnswerIcon;