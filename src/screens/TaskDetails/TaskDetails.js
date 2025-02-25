import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';
import {styles} from './TaskDetailsStyle';
import {Screens} from '../../constants/Constants';
import {apiCall} from '../../config/ApiCall';
import {APIEndpoints, APIMethods} from '../../config/ApiConfig';
import {showToast} from '../../components/ToastComponent/ToastComponent';
import {useFocusEffect} from '@react-navigation/native';
import ThemeButton from '../../components/ThemeButton/ThemeButton';

const TaskDetails = ({route, navigation}) => {
  const {id} = route.params; // Access the task ID from the deep link

  const [taskData, setTaskData] = useState();
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getTask();
    }, [id]),
  );

  const getTask = async () => {
    setLoading(true);
    await apiCall(APIMethods.GET, null, APIEndpoints.todos + '/' + id)
      .then(response => {
        console.log('task', response);
        setLoading(false);
        setTaskData(response.data);
      })
      .catch(err => {
        showToast(err.errorString);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../assets/backIcon.png')}
          style={{width: rw(8), height: rw(8), marginTop: rh(2)}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{taskData?.title}</Text>
        <Text style={styles.description}>
          {moment(taskData?.due_on).format('DD-MM-YYYY')}
        </Text>

        {/* Display the current status */}
        <Text style={styles.status}>Status: {taskData?.status}</Text>

        {/* Button to navigate to the edit screen */}
        <ThemeButton
          label="Edit Task"
          onPress={() =>
            navigation.navigate(Screens.TaskAddEditScreen, {task: taskData})
          }
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#4CAF50'} />
        </View>
      )}
    </View>
  );
};

export default TaskDetails;
