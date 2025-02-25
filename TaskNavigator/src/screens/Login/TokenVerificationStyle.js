import {Dimensions, StyleSheet} from 'react-native';
import {rh, rs, rw} from 'react-native-full-responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    // padding: rw(5),
  },
  title: {
    fontSize: rs(24),
    marginBottom: rh(2),
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: rw(5),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: rh(2),
    padding: rw(3),
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: rs(16),
    width: Dimensions.get('window').width - 40,
  },
  error: {
    color: 'red',
    marginBottom: rh(3),
    fontSize: rs(14),
    textAlign: 'left',
    width: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004D',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
