import React, { useState } from "react";
import axios from "axios";

const HelpBarTest = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }

    const payload = {
      name,
      message,
    };

    try {
      await axios.post("http://localhost:8080/sendmsgjson", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Message sent successfully!");
      // Handle successful response if needed (though the response body won't be accessible)
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleSendMsg = async () => {
    try {
      await axios.get(
        "http://localhost:8080/sendmsg/HiRashad",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("sendmsg called successfully!");
      // Handle successful response if needed (though the response body won't be accessible)
    } catch (error) {
      console.error("Error calling sendmsg:", error);
      setError("Failed to call sendmsg. Please try again.");
    }
  };

  const handleGreet = async () => {
    try {
      await axios.get("http://localhost:8080/greeting", {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });

      console.log("greet called successfully!");
      // Handle successful response if needed (though the response body won't be accessible)
    } catch (error) {
      console.error("Error calling greet:", error);
      setError("Failed to call greet. Please try again.");
    }
  };
  return (
    <div>
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
      <br />
      <button onClick={handleSendMsg}>Send Message to sendmsg Endpoint</button>
      <button onClick={handleGreet}>greet</button>
    </div>
  );
};

export default HelpBarTest;
