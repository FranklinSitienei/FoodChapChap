import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';


function HomeRegister() {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  };
  
  const titleStyle = {
    fontSize: "32px",
    color: "#333",
    textAlign: "center"
  };
  
  const imageStyle = {
    maxWidth: "100%",
    height: "auto"
  };
  
  const paragraphStyle = {
    fontSize: "20px",
    color: "#666",
    lineHeight: "1.5",
    textAlign: "center"
  };
  
  const buttonStyle = {
    backgroundColor: "#ff6347",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "20px",
    fontSize: "18px"
  };
  const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const AnimatedH1 = styled.h1`
  animation: 2s ${fadeIn} ease-in;
`;

const AnimatedH2 = styled.h2`
  animation: 2s ${fadeIn} ease-in;
`;

const AnimatedP = styled.p`
  animation: 2s ${fadeIn} ease-in;
`;
  return (
    <div style={wrapperStyle}>
     <AnimatedH1><h1 style={titleStyle}>Join us at FoodChapChap to unlock your restaurant potential</h1></AnimatedH1> 
      <img style={imageStyle} src="https://media.istockphoto.com/id/1125683587/photo/are-you-ready-for-the-bill.jpg?s=612x612&w=0&k=20&c=fWmz4b5lLRXNTYeC_Sl1z3r90Z4wOOKR4_C0MtKsZC8=" alt="Restaurant" />
      <div>
        <p style={paragraphStyle}>
          Are you tired of the everyday dining frustrations at your restaurant? We
          understand the challenges you face, and we have a solution that can
          change the game for you. FoodChapChap is your gateway to a new era of
          restaurant service, focused on convenience, simplicity, and efficiency.
        </p>
        <Link style={buttonStyle} to="/register+your=restaurant/create+restaurant=form">
          Register Restaurant
        </Link>
      </div>
    </div>
  );
}

export default HomeRegister;
