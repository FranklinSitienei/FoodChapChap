import React from 'react';
import '../css/gettingStarted.css';

function GettingStarted() {
  const infoData = [
    {
      title: "Contact FoodChapChap",
      content: "If you're a restaurant owner interested in joining FoodChapChap, start by reaching out to the FoodChapChap team. You can usually find contact information on their website or through online search."
    },
    {
      title: "Onboarding Process",
      content: "FoodChapChap will guide you through an onboarding process, which includes providing your business information, menu details, and contact information."
    },
    {
      title: "Customize Your Settings",
      content: "You can set your restaurant's availability, operating hours, delivery zones, and pricing preferences on the platform."
    },
    {
      title: "Test Transactions",
      content: "Before going live, conduct test transactions to ensure the ordering process is functional and user-friendly."
    },
    {
      title: "Marketing and Promotion",
      content: "Work with FoodChapChap to promote your restaurant on the platform. This may include featuring your restaurant in newsletters, social media posts, or advertising campaigns."
    },
    {
      title: "Start Receiving Orders",
      content: "Once your restaurant is set up on FoodChapChap, you can start receiving orders from customers. The platform will help you manage and track these orders efficiently."
    },
    {
      title: "Engage with Customers",
      content: "Interact with your customers through the platform, respond to reviews, and offer promotions to attract more business."
    },
    {
      title: "Loyalty Programs and Reports",
      content: "Consider implementing loyalty programs to reward loyal customers. You can also use the platform's reporting tools to gain insights into your restaurant's performance."
    }
  ];
  
  return (
    <div>
      {/* <h1>Getting Started</h1> */}
      <div className="getting-started">
       
      <div className="card-container">
        {infoData.map((section, index) => (
          <div key={index} className="card">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  
  );
}

export default GettingStarted;
