import React, { useState } from "react";

interface SendMessagePayload {
  name: string;
  message: string;
}

const HelpBarTest: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }

    const payload: SendMessagePayload = {
      name,
      message,
    };

    try {
      const response = await fetch("http://localhost:8080/sendmsgjson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Adding the Accept header
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
        // Handle successful response if needed (though the response body won't be accessible)
      } else {
        console.error("Failed to send message:", response.status);
        setError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error sending message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>Error: {error}</div>}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default HelpBarTest;
