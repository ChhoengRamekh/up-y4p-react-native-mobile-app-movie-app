import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Downloads = () => (
  <View>
    {/* <Header bg={colors.headerBarBg} title="My Downloads" /> */}

    <View style={styles.containerIcon}>
      {/* <SvgDownloads fill={colors.bgGrey} size={80} /> */}
    </View>

    <Text style={styles.description}>
      Movies and TV shows that you download appear here.
    </Text>

    <View style={styles.button}>
      <Text style={styles.buttonText}>FIND SOMETHING TO DOWNLOAD</Text>
    </View>

    {/* <Cast /> */}
  </View>
);

const styles = StyleSheet.create({
  containerIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 96,
    height: 140,
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 48,
    width: 140
  },
  description: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
    width: 300
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default Downloads;