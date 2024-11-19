import React from 'react'
import '../css/whyChoose.css';
import styled, { keyframes } from 'styled-components';
function WhyChoose() {
    
      
      const headingStyle = {
        fontSize: "24px",
        color: "#333",
        fontWeight: "bold",
        textAlign: "center"
      };

      const flexContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    
      };
      
      
      const paragraphStyle = {
        fontSize: "18px",
        color: "#666",
        lineHeight: "1.5",
        textAlign: "center"
      };
      const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const AnimatedH1 = styled.h1`
  animation: 2s ${fadeIn} ease-in;
`;
    return (
      <div style={flexContainerStyle}>
        <div>
        <h1 style={{
            justifyContent: 'center',
        }}><AnimatedH1>Why Choose FoodChapChap </AnimatedH1></h1>
          <div>
            <h3 style={headingStyle}>Increase Efficiency: </h3> 
            <p style={paragraphStyle}>With FoodChapChap, you can streamline your restaurant's operations. Say goodbye to long queues and waiting times. Our platform 
              offers advanced order management tools, allowing you to prepare orders seamlessly, reducing wait times for your customers.</p>
          </div>
          <div>
            <h3 style={headingStyle}>Enhance Customer Experience</h3> 
            <p style={paragraphStyle}>
              Your diners no longer need to wait endlessly for their meals. With FoodChapChap's pre-order service, customers can place orders in advance, ensuring their food is 
              ready upon arrival. This not only saves time but also delivers the best dining experience.
            </p>
          </div>
          <div>
            <h3 style={headingStyle}>Boost Revenue</h3> 
            <p style={paragraphStyle}>
              By joining FoodChapChap, you gain access to a wider customer base.
              Pre-ordering is a growing trend, and with our platform, you can tap into this market segment. 
              Attract tech-savvy, time-conscious diners who prefer hassle-free dining experiences.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default WhyChoose;