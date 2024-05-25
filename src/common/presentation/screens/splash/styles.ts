import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    width: 314,
    height: 314,
    borderRadius: 314,
    position: 'absolute',
    top: -208,
    right: -157,
  },
  circle2: {
    width: 314,
    height: 314,
    borderRadius: 314,
    position: 'absolute',
    bottom: -157,
    left: -98,
  },
  containerLoader: {height: 120},
  loader: {
    marginTop: 20,
  },
});
