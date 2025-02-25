import {Dimensions, StyleSheet} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: rh(4),
    paddingHorizontal: rw(3),
  },
  title: {
    fontSize: rs(28),
    fontWeight: 'bold',
    marginBottom: rh(2),
  },
  todoItem: {
    flexDirection: 'row',
    padding: rw(3),
    backgroundColor: '#fff',
    marginBottom: rh(1),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  todoText: {
    fontSize: rs(18),
  },
  error: {
    color: 'red',
    fontSize: rs(16),
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
