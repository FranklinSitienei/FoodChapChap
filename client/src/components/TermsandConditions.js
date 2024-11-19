import React, { useState } from 'react';
import { Link } from "react-router-dom"


const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptanceChange = () => {
    setAccepted(!accepted);
  };

  const handleSubmit = () => {
    if (accepted) {
      
      alert('You have accepted the terms and conditions. Proceed with your action.');
    } else {
      
      alert('You must accept the terms and conditions to proceed.');
    }
  };

  return (
    <>
      {/* <h2>Terms and Conditions</h2>
      <p>Please read and accept the terms and conditions before proceeding.</p> */}

        <input
          type="checkbox"
          checked={accepted}
          onChange={handleAcceptanceChange}
        />

      <p>
          <Link to="/termsandconditions">I accept the terms and conditions </Link>
        </p>

    </>
  );
};

export default TermsAndConditions;
