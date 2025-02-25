import axios from 'axios';
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
import {Dropdown} from 'react-native-element-dropdown';
import {apiCall} from '../../config/ApiCall';
import {APIEndpoints, APIMethods} from '../../config/ApiConfig';
import {storeUserData} from '../../helper/Storage';
import {Constants, Screens} from '../../constants/Constants';
import {showToast} from '../../components/ToastComponent/ToastComponent';
import {rh, rs, rw} from 'react-native-full-responsive';
import {styles} from './UserDetailsStyle';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const UserDetails = ({navigation, route}) => {
  const {userList} = route.params;

  const [name, setName] = useState(__DEV__ ? 'Shubham' : '');
  const [gender, setGender] = useState(
    __DEV__ ? {label: 'Male', value: 'male'} : '',
  );
  const [email, setEmail] = useState(__DEV__ ? 'Shubham@gmail.com' : '');

  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    email: '',
  });

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let formIsValid = true;
    const newErrors = {name: '', gender: '', email: ''};

    if (!name) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
      formIsValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const foundUser = userList.find(user => user.email === email);
      console.log(foundUser);

      if (foundUser) {
        await storeUserData(foundUser);
        Constants.userData = foundUser;
        navigation.navigate(Screens.TaskListScreen);
      } else {
        createUser();
      }
    }
  };

  const createUser = async () => {
    const userData = {
      name: name,
      gender: gender,
      email: email,
      status: 'active',
    };

    setLoading(true);

    await apiCall(APIMethods.POST, userData, APIEndpoints.user)
      .then(async response => {
        console.log('User Created Successfully:', JSON.stringify(response));
        if (response.statusCode === 201) {
          setLoading(false);
          await storeUserData(response.data);
          Constants.userData = response.data;
          navigation.navigate(Screens.TaskListScreen);
        }
      })
      .catch(error => {
        // If there's an error, log the error
        console.log('Error creating user:', error);
        showToast(err.errorString);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Enter Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={'gray'}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <Dropdown
          style={styles.dropdown}
          data={[
            {label: 'Male', value: 'male'},
            {label: 'Female', value: 'female'},
            {label: 'Other', value: 'other'},
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Gender"
          value={gender}
          onChange={item => setGender(item.value)}
          iconStyle={{width: rw(7), height: rw(7)}}
          placeholderStyle={{color: 'gray'}}
        />
        {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <ThemeButton label="Submit" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#4CAF50'} />
        </View>
      )}
    </View>
  );
};

export default UserDetails;
