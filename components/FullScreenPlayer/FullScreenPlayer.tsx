import React, { useRef, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Video } from "expo-av";
import { Storage } from "aws-amplify";
import { Episode } from "../../types";
import styles from "./styles";
import { Playback } from "expo-av/build/AV";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPlayer = ({route, navigation}) => {
  const [videoURL, setVideoURL] = useState("");
  const { uri } = route.params;
  console.log(uri, 'here is data bro')

  const [status, setStatus] = useState({});
  const video = useRef<Playback>(null);
    
  useEffect(() => {
    changeScreenOrientation();
    return () => {
      changeScreenToPotrait();
      console.log('I am out of the component bro')
    };
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  async function changeScreenToPotrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri,
        }}
        usePoster={false}
        shouldPlay
        isMuted={false}
        useNativeControls
        resizeMode="cover"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default VideoPlayer;
