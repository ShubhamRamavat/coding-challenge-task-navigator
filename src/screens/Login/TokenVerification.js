import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {storeToken} from '../../helper/Storage';
import {apiCall} from '../../config/ApiCall';
import {APIMethods} from '../../config/ApiConfig';
import {Constants, Screens} from '../../constants/Constants';
import {showToast} from '../../components/ToastComponent/ToastComponent';
import {styles} from './TokenVerificationStyle';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TokenVerification = ({navigation}) => {
  const [token, setToken] = useState(
    __DEV__
      ? '92bfb724090ad1315626f5962b352227ecab53f70471ccb44cc50bdaab5b398e'
      : '',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const tokenVerify = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await apiCall(
        APIMethods.GET,
        null,
        'https://gorest.co.in/public/v2/users',
        {
          Authorization: `Bearer ${token}`, // Send the token in Authorization header
        },
      );

      console.log('List User', response.data);

      // If the API call is successful, store the token
      await storeToken(token);
      Constants.userAuthToken = token;
      setLoading(false); // Set loading state to false after the API call
      navigation.navigate(Screens.UserDetailsScreen, {
        userList: [...response.data],
      }); // Navigate to the next screen
    } catch (err) {
      console.log('Error', err.statusCode);

      showToast(err.errorString);

      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleVerify = () => {
    setErrorMessage('');

    if (token.trim() === '') {
      setErrorMessage('Token cannot be empty!');
      return;
    }

    console.log('Token Verified: ', token);
    tokenVerify(); // Call token verification function
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Enter Token</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your token"
          value={token}
          onChangeText={setToken}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <ThemeButton label="Verify" onPress={handleVerify} />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'#4CAF50'} />
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TokenVerification;
