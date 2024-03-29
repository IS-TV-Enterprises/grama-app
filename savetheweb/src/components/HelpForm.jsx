import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { grey, orange } from "@mui/material/colors";

const HelpForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [certificateNo, setCertificateNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");
  const [messageDelivered, setMessageDelivered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }

    const payload = {
      name,
      message,
      certificateNo,
      phoneNo,
    };

    try {
      await axios.post(
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/laot/slack/endpoint-8080-5c6/v1.0/sendmsgjson",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Message sent successfully!");
      // Handle successful response if needed (though the response body won't be accessible)
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }

    // For example, log the data to console
    console.log("Name:", name);
    console.log("Message:", message);
    console.log("Certificate No.:", certificateNo);
    console.log("Phone No.:", phoneNo);

    // Clear form fields after submission
    setName("");
    setMessage("");
    setCertificateNo("");
    setPhoneNo("");
    setError("");
    setMessageDelivered(true);
  };

  const handleClose = () => {
    setMessageDelivered(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        mt: 5,
        padding: 4,
        backgroundColor: grey[200],
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Help Form
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center">
          Error: {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Certificate No."
          variant="outlined"
          fullWidth
          margin="normal"
          value={certificateNo}
          onChange={(e) => setCertificateNo(e.target.value)}
        />
        <TextField
          label="Phone No."
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2, // Adjust this margin if needed
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>

      <Dialog open={messageDelivered} onClose={handleClose}>
        <DialogTitle>Message Delivered</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your help request has been submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HelpForm;
