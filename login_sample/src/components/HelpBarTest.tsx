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
  const [name, setName] = useState<string>("");

  interface SendMessagePayload {
    message: string;
    name: string;
  }

  async function sendMessage(message: string, name: string): Promise<void> {
    const url = "http://localhost:8080/sendmsgjson";

    const payload: SendMessagePayload = {
      message,
      name,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
        // You can do something with the response if needed
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const handleChangeMsg = (event: ChangeEvent<HTMLInputElement>): void => {
    setMsg(event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  // handle submit function should simply sent a post request to http://localhost:8080/sendmsg/ with the message as a query parameter
  // the response should be displayed in a div below the input field
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    console.log("A message was submitted: " + msg);
    console.log("A name was submitted: " + name);
    sendMessage(msg, name);
  };

  return (
    <>
      <h2>Help Bar Test</h2>
      <div className="json">
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input type="text" value={msg} onChange={handleChangeMsg} />
          </label>{" "}
          <br />
          <label>
            Name:
            <input type="text" value={name} onChange={handleChangeName} />
          </label>
          <br />
          <button type="submit">Send Message</button>
        </form>
        <div>{response}</div>
      </div>
    </>
  );
};
