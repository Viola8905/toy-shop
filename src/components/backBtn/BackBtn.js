
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Link as MaterialLink } from "@material-ui/core";
import back from '../../img/goBack.png'
const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      //  className={classes.backButton}
      style={{ margin: "10px 10px", color: "white" }}
      variant="outlined"
      size="small"
      onClick={() => navigate(-1)}
    >
      <img src={back} alt="img" style={{maxWidth:"30px"}}/>
			
    </button>
  );
};

export default BackBtn;