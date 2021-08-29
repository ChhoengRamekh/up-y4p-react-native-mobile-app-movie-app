import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { DataStore } from "@aws-amplify/datastore";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import styles from "./styles";
// import categories from "../../assets/data/categories";
import HomeCategory from "../../components/HomeCategory";
import { Category } from "../../src/models";

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category));
    };
    fetchCategories();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <HomeCategory category={item} />}
      />
    </View>
  );
};

export default HomeScreen;
