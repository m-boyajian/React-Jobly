import React from "react";

function Error({ messages }) {
  return (
    <div>
      {messages.map((error, index) => (
        <p key={index} className="error-message">
          {error}
        </p>
      ))}
    </div>
  );
}

export default Error;
