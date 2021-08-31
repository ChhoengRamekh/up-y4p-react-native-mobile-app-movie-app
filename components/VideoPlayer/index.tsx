import React, { useRef, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Video } from "expo-av";
import { Storage } from "aws-amplify";
import { Episode } from "../../types";
import styles from "./styles";
import { Playback } from "expo-av/build/AV";

interface VideoPlayerProps {
  episode: Episode;
  isPlaying: boolean;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { episode, isPlaying } = props;
  const [videoURL, setVideoURL] = useState("");

  const [status, setStatus] = useState({});
  const video = useRef<Playback>(null);

  return (
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: episode.video,
      }}
      posterSource={{
        uri: episode.poster,
      }}
      posterStyle={{
        resizeMode: "cover",
      }}
      usePoster={false}
      shouldPlay={isPlaying}
      isMuted={false}
      useNativeControls
      resizeMode="contain"
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
};

export default VideoPlayer;
