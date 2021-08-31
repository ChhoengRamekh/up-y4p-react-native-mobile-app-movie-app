import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import Colors from "../styles/colors";
import { globalStyle } from "../styles/global";
import { typography } from "../styles/typography";
import { useAsync } from "../util/useAsync";
import SearchItem from "../components/SearchItems";
import { Movie } from "../src/models";
import { DataStore } from "@aws-amplify/datastore";

const Search = () => {
  const [searchText, setSearchText] = React.useState("");
  // const {data, error, run} = useAsync<SearchResult[] | Trending[]>([]);
  const [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchText) {
      // run(getSearch(searchText));
      console.log(searchText, '{}')
      getSearchMovie(searchText)
    } else {
      fetchMovie();
    }
  }, [searchText]);

  const getSearchMovie = async (searchText) => {
    const allMovie = await DataStore.query(Movie, c => c.title('beginsWith', searchText).title('contains', searchText));
    setMovie(allMovie);
    console.log('Search Result:', allMovie);
  };
  const fetchMovie = async () => {
    const allMovie = await DataStore.query(Movie);
    setMovie(allMovie);
  };

  const label = searchText ? "Movies & TV Shows" : "Top Searches";

  return (
    <View style={styles.searchContainer}>
      <SafeAreaView>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.slateGray}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            clearButtonMode="while-editing"
            selectionColor={Colors.slateGray}
            style={styles.textInput}
          />
        </View>
        <Text style={styles.label}>{label}</Text>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <View style={globalStyle.flex}>

            <FlatList
              data={movie}
              style={{ marginBottom: 250 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <SearchItem
                  movie={item}
                  // onPress={setCurrentEpisode}
                  style={{ marginBottom: 250 }}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

Search.options = {
  bottomTab: {
    text: "Search",
  },
};

const styles = StyleSheet.create({
  searchContainer: {
    ...globalStyle.container,
    backgroundColor: Colors.charcoal,
    flex: 1,
  },
  searchInput: {
    backgroundColor: Colors.mediumGray,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 16,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 4,
    padding: 4,
  },
  textInput: {
    color: Colors.charcoal,
    height: 30,
  },
  label: {
    ...typography.display4,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Search;
