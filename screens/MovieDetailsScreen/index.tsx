import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "../../components/Themed";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import movie from "../../assets/data/movie";
import { DataStore } from "@aws-amplify/datastore";
import { Movie, Season, Episode } from "../../src/models";
import ReactNativePickerModule from "react-native-picker-module";
import * as ScreenOrientation from "expo-screen-orientation";

import {
  MaterialIcons,
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import EpisodeItem from "../../components/EpisodeItem";
import VideoPlayer from "../../components/VideoPlayer";
import { listSeasons } from "../../src/graphql/queries";

const firstEpisode = movie.seasons.items[0];
const firstSeason = movie.seasons.items[0];
const MovieDetailsScreen = ({ navigation }) => {
  const [currentSeason, setCurrentSeason] = useState<Season | undefined>(
    undefined
  );
  const [currentEpisode, setCurrentEpisode] = useState<Episode | undefined>(
    undefined
  );
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [seasons, setSeasons] = useState<Season | undefined>(undefined);
  const [episodes, setEpisodes] = useState<Episode | undefined>(undefined);
  const [videoPlay, setVideoPlay] = useState(true);

  const route = useRoute();
  const seasonNames = seasons ? seasons.map((season) => season.name) : [];

  const pickerRef = useRef();
  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(await DataStore.query(Movie, route?.params?.id));
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    if (!movie) {
      return;
    }
    const fetchSeasons = async () => {
      const movieSeasons = (await DataStore.query(Season)).filter(
        (s) => s.movie?.id == movie.id
      );
      setSeasons(movieSeasons);
      setCurrentSeason(movieSeasons[0]);
      // console.log('start=====', currentSeason.name, 'her is current season')

      if (!currentSeason) {
        const notCurrentEpisode = {
          poster: movie.poster,
          video: movie.video,
        };
        setCurrentEpisode(notCurrentEpisode);
      }
    };
    fetchSeasons();
  }, [movie]);

  useEffect(() => {
    if (!currentSeason) {
      return;
    }
    const fetchEpisodes = async () => {
      const seasonEpisode = (await DataStore.query(Episode)).filter(
        (e) => e?.season?.id === currentSeason?.id
      );
      setEpisodes(seasonEpisode);
      setCurrentEpisode(seasonEpisode[0]);
    };

    fetchEpisodes();
  }, [currentSeason]);

  const setSeasonOnPickerChange = (value) => {
    const seasonIndex = seasons.findIndex((s) => s.name == value);
    setCurrentSeason(seasons[seasonIndex]);
  };

  const playVideoFullScreen = () => {
    setVideoPlay(false)
    navigation.navigate("FullScreenPlayer", {
      uri: currentEpisode?.video
    })
  }

  if (!movie) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      {currentEpisode && <VideoPlayer episode={currentEpisode} isPlaying={videoPlay} />}

      <FlatList
        data={episodes}
        style={{ marginBottom: 250 }}
        renderItem={({ item }) => (
          <EpisodeItem
            episode={item}
            onPress={setCurrentEpisode}
            style={{ marginBottom: 250 }}
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: 12 }}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.match}>98% match</Text>
              <Text style={styles.year}>{movie.year}</Text>
              <View style={styles.ageOfContainer}>
                <Text style={styles.age}>16+</Text>
              </View>
              <Text style={styles.year}>{movie.numberOfSeasons} Seasons</Text>
              <MaterialIcons name="hd" size={24} color="white" />
            </View>
            <Pressable
              onPress={() => playVideoFullScreen()}
              style={styles.playButton}
            >
              <Text style={styles.playButtonText}>
                <Entypo name="controller-play" size={16} color="black" />
                Play
              </Text>
            </Pressable>
            <Pressable onPress={() => {}} style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>
                <AntDesign name="download" size={16} color="white" /> Download
              </Text>
            </Pressable>

            <Text style={{ marginVertical: 10 }}>{movie.plot}</Text>
            <Text style={styles.year}>Cast: {movie.cast}</Text>
            <Text>Creator: {movie.creator}</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <AntDesign name="plus" size={30} color="white" />
                <Text style={{ color: "darkgrey" }}>My List</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <Feather name="thumbs-up" size={30} color="white" />
                <Text style={{ color: "darkgrey" }}>Rate</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <FontAwesome name="send-o" size={30} color="white" />
                <Text style={{ color: "darkgrey" }}>Share</Text>
              </View>
            </View>
            {currentSeason && (
              <>
                <SafeAreaView>
                  <Button
                    title={currentSeason.name}
                    onPress={() => pickerRef.current.show()}
                  />
                </SafeAreaView>
                <ReactNativePickerModule
                  pickerRef={pickerRef}
                  value={currentSeason.name}
                  title={"Select Season"}
                  items={seasonNames}
                  titleStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                  selectedColor="#FC0"
                  confirmButtonEnabledTextStyle={{ color: "white" }}
                  confirmButtonDisabledTextStyle={{ color: "grey" }}
                  cancelButtonTextStyle={{ color: "white" }}
                  confirmButtonStyle={{
                    backgroundColor: "rgba(0,0,0,1)",
                  }}
                  cancelButtonStyle={{
                    backgroundColor: "rgba(0,0,0,1)",
                  }}
                  contentContainerStyle={{
                    backgroundColor: "rgba(0,0,0,1)",
                  }}
                  onValueChange={(value) => {
                    setSeasonOnPickerChange(value);
                  }}
                />
              </>
            )}
          </View>
        }
      />
    </View>
  );
};

export default MovieDetailsScreen;
