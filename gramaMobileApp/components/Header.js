// // CustomHeader.js
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, SafeAreaView, Alert, StyleSheet, TextInput } from 'react-native';

// const CustomHeader = ({ navigation, route }) => {
//   const isRequestPage = route.name === 'CertificateRequestPage';
//   const isStatusPage = route.name === 'CertificateStatusPage';

//   const handleRequestPress = () => {
//     if (!isRequestPage) {
//       navigation.navigate('CertificateRequestPage');
//     }
//   };

//   const handleStatusPress = () => {
//     if (!isStatusPage) {
//       navigation.navigate('CertificateStatusPage');
//     }
//   };

//   const [helpMessage, setHelpMessage] = useState('');

//   const showHelpPopup = () => {
//     Alert.prompt(
//       'Help',
//       'Type your message:',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Submit',
//           onPress: () => {
//             // Handle the submitted message (you can use the helpMessage state)
//             Alert.alert('Submitted', `You entered: ${helpMessage}`);
//           },
//         },
//       ],
//       'plain-text', // This specifies that the input should be a plain text input
//       helpMessage // Set the default value of the text input
//     );
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <TouchableOpacity
//           onPress={handleRequestPress}
//           style={[styles.buttonOrange, isRequestPage && styles.disabledButton]}
//           disabled={isRequestPage}
//         >
//           <Text style={styles.buttonText}>Request</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleStatusPress}
//           style={[styles.buttonOrange, isStatusPage && styles.disabledButton]}
//           disabled={isStatusPage}
//         >
//           <Text style={styles.buttonText}>Status</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={showHelpPopup}
//           style={styles.buttonGrey}
//         >
//           <Text style={styles.buttonText}>Help</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#FFA500',
//   },
//   buttonOrange: {
//     backgroundColor: '#ff8c00', // Orange color
//     padding: 10,
//     borderRadius: 8,
//     width: 80, // Fixed width
//     marginTop: 10,
//     elevation: 5,
//   },
//   buttonGrey: {
//     backgroundColor: '#808080', // Grey color
//     padding: 10,
//     borderRadius: 8,
//     width: 80, // Fixed width
//     marginTop: 10,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   disabledButton: {
//     elevation: 0,
//     backgroundColor: '#FFA500', // Light grey for disabled state
//   },
// });

// export default CustomHeader;

// CustomHeader.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import HelpModal from './HelpModal';

const CustomHeader = ({ navigation, route }) => {
  const isRequestPage = route.name === 'CertificateRequestPage';
  const isStatusPage = route.name === 'CertificateStatusPage';

  const handleRequestPress = () => {
    if (!isRequestPage) {
      navigation.navigate('CertificateRequestPage');
    }
  };

  const handleStatusPress = () => {
    if (!isStatusPage) {
      navigation.navigate('CertificateStatusPage');
    }
  };

  const [isHelpModalVisible, setHelpModalVisible] = useState(false);

  const showHelpModal = () => {
    setHelpModalVisible(true);
  };

  const hideHelpModal = () => {
    setHelpModalVisible(false);
  };

  const handleHelpSubmit = (message) => {
    // Handle the submitted message
    console.log('Submitted message:', message);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleRequestPress}
          style={[styles.buttonOrange, isRequestPage && styles.disabledButton]}
          disabled={isRequestPage}
        >
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStatusPress}
          style={[styles.buttonOrange, isStatusPage && styles.disabledButton]}
          disabled={isStatusPage}
        >
          <Text style={styles.buttonText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showHelpModal} style={styles.buttonGrey}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <HelpModal
          visible={isHelpModalVisible}
          onClose={hideHelpModal}
          onSubmit={handleHelpSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFA500',
  },
  buttonOrange: {
    backgroundColor: '#ff8c00', // Orange color
    padding: 10,
    borderRadius: 8,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonGrey: {
    backgroundColor: '#808080', // Grey color
    padding: 10,
    borderRadius: 8,
    width: 80, // Fixed width
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  disabledButton: {
    elevation: 0,
    backgroundColor: '#FFA500', // Light grey for disabled state
  },
});

export default CustomHeader;

