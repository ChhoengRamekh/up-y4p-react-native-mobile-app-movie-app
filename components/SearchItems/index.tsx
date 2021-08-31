import React from "react";
import { Image, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { Movie } from "../../src/models";
import { useNavigation } from "@react-navigation/native";


interface SearchItemProps {
  movie: Movie;
}
const SearchItem = (props: SearchItemProps) => {
  const { movie } = props;
  // console.log("here movie======", movie.title);
  const navigation = useNavigation();

  const onMoviePress = (movie: Movie) => {
    // console.log(movie.id, 'here is movie on press')
    navigation.navigate("MovieDetailsScreen", { id: movie.id });
  };

  return (
    <Pressable style={{ margin: 10 }} onPress={() => onMoviePress(movie)}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: movie.poster }} />

        <View style={styles.titleContainer}>
          <Text>{movie.title} </Text>
          <Text style={styles.duration}>{movie.year}</Text>
        </View>
        <AntDesign name="download" size={24} />
      </View>
    </Pressable>
  );
};

export default SearchItem;
