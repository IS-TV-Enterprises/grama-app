import React, { useState } from "react";

interface SendMessagePayload {
  name: string;
  message: string;
}

const Helpbar2: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const payload: SendMessagePayload = {
      name,
      message,
    };

    console.log(payload);

    try {
      const response = await fetch("http://localhost:8080/sendmsgjson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
        // Handle successful response if needed
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Helpbar2;
