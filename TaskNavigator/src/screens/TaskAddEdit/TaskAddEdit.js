import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {apiCall} from '../../config/ApiCall';
import moment from 'moment';
import {getUserData} from '../../helper/Storage';
import {showToast} from '../../components/ToastComponent/ToastComponent';
import {rh, rw} from 'react-native-full-responsive';
import {styles} from './TaskAddEditStyle';
import {Dropdown} from 'react-native-element-dropdown';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TaskAddEdit = ({route, navigation}) => {
  const {task} = route.params || {}; // Extract task if provided
  const [title, setTitle] = useState(task ? task.title : '');
  const [date, setDate] = useState(
    task ? moment(task.due_on).format('DD-MM-YYYY') : '',
  );

  const [isLoading, setLoading] = useState(false);

  const [status, setStatus] = useState(task ? task.status : 'pending'); // Add state for status

  const [errorMessage, setErrorMessage] = useState('');

  // Handle the save or create task
  const handleSave = () => {
    setErrorMessage(''); // Clear previous error

    // Validation
    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }

    if (!date.trim()) {
      setErrorMessage('Date is required');
      return;
    }

    task ? updateTask() : createTask(); // Conditional check for updating or creating task
  };

  // Create new task
  const createTask = async () => {
    const taskData = {title, status: 'pending', due_on: date};

    const userData = await getUserData();

    console.log(userData);
    setLoading(true);

    try {
      const response = await apiCall(
        'POST',
        taskData,
        `https://gorest.co.in/public/v2/users/${userData.id}/todos`,
      );

      if (response.statusCode === 201) {
        console.log('Task Created Successfully:', response);
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating task:', error);
      showToast(err.errorString);
      setLoading(false);
    }
  };

  // Update existing task
  const updateTask = async () => {
    const taskData = {title, status, due_on: date};

    console.log(`https://gorest.co.in/public/v2/todos/${task.id}`, taskData);

    setLoading(true);
    try {
      const response = await apiCall(
        'PUT',
        taskData,
        `https://gorest.co.in/public/v2/todos/${task.id}`,
      );

      if (response.statusCode === 200) {
        console.log('Task Updated Successfully:', response);
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      showToast(err.errorString);
      setLoading(false);
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setDate(formattedDate); // Set the date in the state
    hideDatePicker();
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.subContainer}
        style={{flex: 1}}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{task ? 'Edit Task' : 'Create Task'}</Text>

          {/* Title Input */}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="gray"
          />

          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.datePickerButton}>
            <Text style={styles.dateText}>
              {date ? date : 'Select Due Date'}
            </Text>
          </TouchableOpacity>

          <Dropdown
            style={styles.dropdown}
            data={[
              {label: 'Pending', value: 'pending'},
              {label: 'Completed', value: 'completed'},
            ]}
            labelField="label"
            valueField="value"
            placeholder="Select Status"
            value={status}
            onChange={item => setStatus(item.value)}
            iconStyle={{width: rw(7), height: rw(7)}}
            placeholderStyle={{color: 'gray'}}
            selectedTextStyle={styles.selectedText}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Error message */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {/* Save or Create Button */}
          <ThemeButton
            label={task ? 'Save Task' : 'Create Task'}
            onPress={handleSave}
          />
        </View>
      </KeyboardAwareScrollView>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#4CAF50'} />
        </View>
      )}
    </View>
  );
};

export default TaskAddEdit;
