import React from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";

// 아래 줄에서 {} 안 쓰면 오류 뜸.
import { CATEGORIES } from "../data/dummy-data";
import { MEALS } from "../data/dummy-data";

import MealList from "../components/MealList";
import Colors from "../constants/Colors";

const CategoryMealsScreen = (props) => {
    const catId = props.navigation.getParam("categoryId");

    // MEALS에 대해 catId와 일치하는 배열 원소들을 찾아 배열로 넣어준다.
    const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

    return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    // navigationData과 CategoryMealsScreen.props가 동일한 내용임.
    const catId = navigationData.navigation.getParam("categoryId");
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};
const styles = StyleSheet.create({
    screen: {
        margin: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CategoryMealsScreen;
