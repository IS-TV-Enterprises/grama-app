// import React from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LogoutScreen = () => {

//     const handleLogout = async () => {
//         try {
//           // Retrieve the access token from AsyncStorage
//           const accessToken = await AsyncStorage.getItem('accessToken');
      
//           // Your client ID (replace 'your_client_id' with the actual client ID)
//           const clientId = 'XTe3UDXz7d5M6Ghuem7hRr5ITEYa';
      
//           // If there's an access token, send a request to revoke it
//           if (accessToken) {
//             const revokeResponse = await fetch(
//               'https://api.asgardeo.io/t/istventerprises/oauth2/revoke',
//               {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: `token=${accessToken}&token_type_hint=access_token&client_id=${clientId}`,
//               }
//             );

//             console.log(revokeResponse.status);
      
//             // Check the response status
//             if (revokeResponse.ok) {
//               // Remove the access token from AsyncStorage
//               await AsyncStorage.removeItem('accessToken');
//             } else {
//               // Handle the case where revocation fails
//               Alert.alert('Logout failed', 'Failed to revoke the access token');
//             }
//           } else {
//             // Handle the case where there's no access token to revoke
//             Alert.alert('Logout failed', 'No access token found');
//           }
//         } catch (error) {
//           console.error('Error during logout:', error);
//         }
//       };


//   return (
//     <View>
//       <TouchableOpacity onPress={handleLogout}>
//         <Text>Forget Me</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LogoutScreen;
