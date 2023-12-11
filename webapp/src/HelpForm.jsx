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

const HelpForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
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

    // For example, log the data to console
    console.log("Name:", name);
    console.log("Message:", message);

    // Clear form fields after submission
    setName("");
    setMessage("");
    setError("");
    setMessageDelivered(true);
  };

  const handleClose = () => {
    setMessageDelivered(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
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
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
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
