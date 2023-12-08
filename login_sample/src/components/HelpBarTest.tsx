// give me a simple help bar with a text input field and a button to send the message to http://localhost:8080/sendmsg/
// the message should be simply added to the end of the url as a query parameter

// the response should be displayed in a div below the input field
// the response should be cleared when the button is clicked again

// that is all

import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  ReactElement,
  useState,
} from "react";

export const HelpBarTest: FunctionComponent = (): ReactElement => {
  const [msg, setMsg] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  async function sendMessage(message: string): Promise<void> {
    const url = "http://localhost:8080/sendmsg/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
        },
        body: JSON.stringify({ message }), // Sending the message as JSON
      });

      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMsg(event.target.value);
  };

  // handle submit function should simply sent a post request to http://localhost:8080/sendmsg/ with the message as a query parameter
  // the response should be displayed in a div below the input field
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    sendMessage(msg);
  };

  return (
    <>
      <h2>Help Bar Test</h2>
      <div className="json">
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input type="text" value={msg} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>{response}</div>
      </div>
    </>
  );
};
