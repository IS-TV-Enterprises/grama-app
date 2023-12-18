
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'myapp',
});
console.log(redirectUri);

const CLIENT_ID = 'XTe3UDXz7d5M6Ghuem7hRr5ITEYa'; // store this in .env

const LoginScreen = () => {
  const navigation = useNavigation();

  const discovery = AuthSession.useAutoDiscovery(
    'https://api.asgardeo.io/t/istventerprises/oauth2/token'
  );
  const [tokenResponse, setTokenResponse] = useState({});
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: CLIENT_ID,
      responseType: 'code',
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  const storeAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  };

  const getAccessToken = () => {
    if (result?.params?.code) {
      fetch(
        'https://api.asgardeo.io/t/istventerprises/oauth2/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          // Store the access token in AsyncStorage
          await storeAccessToken(data.access_token);

          // Update the state with the token response
          setTokenResponse(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    (async function setResult() {
      if (result) {
        if (result.error) {
          Alert.alert(
            'Authentication error',
            result.params.error_description || 'Something went wrong'
          );
          return;
        }
        if (result.type === 'success') {
          getAccessToken();
          console.log(result.type);
          navigation.navigate('CertificateRequestPage', {
            accessToken: tokenResponse.access_token,
          });
        }
      }
    })();
  }, [result]);

  return (
    <View style={styles.container}>
      <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
      <View style={styles.accessTokenBlock}>
        <Text>Access Token: {tokenResponse.access_token}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessTokenBlock: {
    width: 300,
    height: 100,
    overflow: 'scroll',
    marginTop: 20,
  },
});

export default LoginScreen;


// import { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button, Alert } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
// import { useNavigation } from '@react-navigation/native';

// WebBrowser.maybeCompleteAuthSession();

// const redirectUri = AuthSession.makeRedirectUri({
//   scheme: 'myapp',
// });
// console.log(redirectUri);

// const CLIENT_ID = 'XTe3UDXz7d5M6Ghuem7hRr5ITEYa';  //store this in .env

// const LoginScreen = () => {
//     const navigation = useNavigation();

//   const discovery = AuthSession.useAutoDiscovery(
//     'https://api.asgardeo.io/t/istventerprises/oauth2/token'
//   );
//   const [tokenResponse, setTokenResponse] = useState({});
//   const [request, result, promptAsync] = AuthSession.useAuthRequest(
//     {
//       redirectUri,
//       clientId: CLIENT_ID,
//       responseType: 'code',
//       scopes: ['openid', 'profile'],
//     },
//     discovery
//   );

//   const getAccessToken = () => {
//     if (result?.params?.code) {
//       fetch(
//         'https://api.asgardeo.io/t/istventerprises/oauth2/token',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setTokenResponse(data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   useEffect(() => {
//     (async function setResult() {
//       if (result) {
//         if (result.error) {
//           Alert.alert(
//             'Authentication error',
//             result.params.error_description || 'Something went wrong'
//           );
//           return;
//         }
//         if (result.type === 'success') {
//           getAccessToken();
//           console.log(result.type);
//           console.log(tokenResponse.access_token)
//           navigation.navigate('CertificateRequestPage', { accessToken: tokenResponse.access_token });  //change this 

//         }
//       }
//     })();
//   }, [result]);

//   return (
//     <View style={styles.container}>
//       <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
//       <View style={styles.accessTokenBlock}>
//         <Text>Access Token: {tokenResponse.access_token}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   accessTokenBlock: {
//     width: 300,
//     height: 100,
//     overflow: 'scroll',
//     marginTop: 20,
//   },
// });

// export default LoginScreen;



