import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const RequestForm = () => {
  const [nic, setNic] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [city, setCity] = useState('');
  const [purpose, setPurpose] = useState('');
  const [division, setDivision] = useState('');

  const predefinedDivisions = [
    'Division 1',
    'Division 2',
    'Division 3',
    // Add more divisions as needed
  ];

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
      {/* Address Line 2 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 2</Text>
        <TextInput
          style={styles.input}
          value={addressLine2}
          onChangeText={(text) => setAddressLine2(text)}
          placeholder="Enter Address Line 2"
        />
      </View>
      {/* Address Line 3 */}
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
        <Picker
          style={styles.input}
          selectedValue={division}
          onValueChange={(itemValue) => setDivision(itemValue)}
        >
          <Picker.Item label="Select Division" value="" />
          {predefinedDivisions.map((div, index) => (
            <Picker.Item key={index} label={div} value={div} />
          ))}
        </Picker>
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
});

export default RequestForm;
