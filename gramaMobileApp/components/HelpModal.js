// HelpModal.js
import React, { useState } from 'react';
import { Modal, View, ScrollView, TextInput, Button, StyleSheet } from 'react-native';

const HelpModal = ({ visible, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleCancel = () => {
    setMessage('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(message);
    setMessage('');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message"
              multiline={true}
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleCancel} color="#808080" />
            <Button title="Submit" onPress={handleSubmit} color="#FFA500" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    width: '80%', // Adjust the width as needed
  },
  scrollContainer: {
    maxHeight: 120, // Adjust the maxHeight as needed
  },
  input: {
    height: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default HelpModal;
