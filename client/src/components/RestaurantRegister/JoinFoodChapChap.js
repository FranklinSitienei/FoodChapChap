import React from 'react';
import '../css/joinFoodChapChap.css';

function JoinFoodChapChap() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    textAlign: "center"
  };
  
  const titleStyle = {
    fontSize: "24px",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "10px"
  };
  
  const paragraphStyle = {
    fontSize: "18px",
    color: "#666",
    lineHeight: "1.5"
  };
  
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Join FoodChapChap Today and Revolutionize Your Restaurant Business!</h2>
      <p style={paragraphStyle}>
        With FoodChapChap, you're not just joining a platform; you're embracing a new way of doing business in the restaurant industry. Don't miss out on the opportunity to simplify your operations, delight your customers, and boost your revenue. Join us now and let's create a dining experience like no other.
      </p>
    </div>
  );
}

export default JoinFoodChapChap;

