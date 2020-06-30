// Can select the food category
import React from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({ routeName: "CategoryMeals" });
                }}
            >
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    console.log(props);
    return <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}></FlatList>;
};

// TODO: navigationOptions에 대해서 더 공부하기
CategoriesScreen.navigationOptions = {
    headerTitle: "Meal Categories",
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
    },
});

export default CategoriesScreen;
