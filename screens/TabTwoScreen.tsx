import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const onLogout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={onLogout}>
        <Text style={{padding: 10, backgroundColor: 'white', color: 'black'}}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
