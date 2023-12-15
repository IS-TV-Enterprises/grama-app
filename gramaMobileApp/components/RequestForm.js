import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

const RequestForm = () => {
  const [nic, setNic] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [city, setCity] = useState('');
  const [purpose, setPurpose] = useState('');
  const [division, setDivision] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const predefinedDivisions = [
    'Division 1',
    'Division 2',
    'Division 3',
    // Add more divisions as needed
  ];

  const renderDivisionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setDivision(item);
        setModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    // Perform actions on form submission
    console.log('Form submitted:', { nic, addressLine1, city, purpose, division });
  };

  return (
    <View style={styles.container}>
      {/* NIC Number */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>NIC Number *</Text>
        <TextInput
          style={styles.input}
          value={nic}
          onChangeText={(text) => setNic(text)}
          placeholder="Enter NIC Number"
        />
      </View>

      {/* Address Line 1 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 1 *</Text>
        <TextInput
          style={styles.input}
          value={addressLine1}
          onChangeText={(text) => setAddressLine1(text)}
          placeholder="Enter Address Line 1"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 2</Text>
        <TextInput
          style={styles.input}
          value={addressLine2}
          onChangeText={(text) => setAddressLine2(text)}
          placeholder="Enter Address Line 2"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 3</Text>
        <TextInput
          style={styles.input}
          value={addressLine3}
          onChangeText={(text) => setAddressLine3(text)}
          placeholder="Enter Address Line 3"
        />
      </View>

      {/* City */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>City *</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Enter City"
        />
      </View>

      {/* Purpose of obtaining the Grama Certificate */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Purpose *</Text>
        <TextInput
          style={styles.input}
          value={purpose}
          onChangeText={(text) => setPurpose(text)}
          placeholder="Enter Purpose"
        />
      </View>

      {/* Grama Niladhari Division */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Grama Niladhari Division *</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setModalVisible(true)}
        >
          <Text>{division || 'Select Division'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={predefinedDivisions}
              renderItem={renderDivisionItem}
              keyExtractor={(item) => item}
            />
          </View>
        </Modal>
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} disabled={!nic || !addressLine1 || !city || !purpose || !division} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    color: 'black', // Set the text color for better visibility
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
  },
});

export default RequestForm;
