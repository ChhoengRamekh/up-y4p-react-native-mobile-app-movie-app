import React from "react";
import { Image, Pressable, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "../../components/Themed";
import styles from "./styles";
import movie from "../../assets/data/movie";
import {
  MaterialIcons,
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import EpisodeItem from "../../components/EpisodeItem";

const firstEpisode = movie.seasons.items[0].episodes.items[0];
const firstSeason = movie.seasons.items[0];
const MovieDetailsScreen = () => {
  const seasonNames = movie.seasons.items.map((season) => season.name);
  console.log(seasonNames, "here is season name ==========");
  return (
    <View>
      <Image style={styles.image} source={{ uri: firstEpisode.poster }} />

      <FlatList
        data={firstSeason.episodes.items}
        style={{ marginBottom: 250 }}
        renderItem={({ item }) => <EpisodeItem episode={item} />}
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
            <Pressable onPress={() => {}} style={styles.playButton}>
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
            <Picker
              selectedValue={"a"}
              onValueChange={(itemValue, itemIndex) => {}}
              style={{color: 'white', width: 130 }}
              itemStyle={{backgroundColor: 'white'}}
              dropdownIconColor={"white"}
            >
              {seasonNames.map((seasonName) => (
                <Picker.Item
                  label={seasonName}
                  value={seasonName}
                  key={seasonName}
                />
              ))}
            </Picker>
          </View>
        }
      />
    </View>
  );
};

export default MovieDetailsScreen;
