import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {apiCall} from '../../config/ApiCall';
import {useFocusEffect} from '@react-navigation/native';
import {showToast} from '../../components/ToastComponent/ToastComponent';
import {getTaskList, storeTaskList} from '../../helper/Storage';
import NetInfo from '@react-native-community/netinfo';
import {rh, rw} from 'react-native-full-responsive';
import {styles} from './TaskListStyle';
import {Screens} from '../../constants/Constants';
import {APIEndpoints, APIMethods} from '../../config/ApiConfig';
import ThemeButton from '../../components/ThemeButton/ThemeButton';

const TaskList = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      checkNetworkStatus();
      fetchTaskList(); // Fetch all tasks on screen focus
    }, []),
  );

  const checkNetworkStatus = () => {
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected);
    });
  };

  const fetchTaskList = async () => {
    setIsLoading(true);
    setTasks([]); // Reset tasks on reload

    try {
      if (isOnline) {
        const response = await apiCall(
          'GET',
          null,
          `https://gorest.co.in/public/v2/todos`,
        );

        if (response.statusCode === 200) {
          setTasks(response.data);
          await storeTaskList(response.data);
        } else {
          setError('Failed to fetch tasks.');
        }
      } else {
        const storedTasks = await getTaskList();
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setError('No tasks available.');
        }
      }
    } catch (err) {
      console.log('Error fetching tasks:', err);
      showToast(err.errorString);
      setError('Failed to load tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async id => {
    await apiCall(APIMethods.DELETE, null, `${APIEndpoints.todos}/${id}`)
      .then(response => {
        if (response.statusCode === 204) {
          fetchTaskList(); // Refresh list after deletion
        }
      })
      .catch(err => {
        showToast(err.errorString);
      });
  };

  const renderItem = useMemo(
    () =>
      ({item}) =>
        (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                navigation.navigate(Screens.TaskDetailsScreen, {id: item.id})
              }>
              <Text style={styles.todoText} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Image
                source={require('../../assets/delete.png')}
                style={{width: rw(5), height: rw(5)}}
              />
            </TouchableOpacity>
          </View>
        ),
    [navigation], // Add 'navigation' to the dependencies to ensure the function is updated when needed
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : tasks.length === 0 ? (
        <View style={styles.loaderContainer}>
          <Text>No tasks available.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ThemeButton
        onPress={() => navigation.navigate(Screens.TaskAddEditScreen)}
        label={'Create Task'}
      />
    </View>
  );
};

export default TaskList;
