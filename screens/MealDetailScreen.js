import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const MealDetailScreen = (props) => {
    return (
        <View style={styles.mealdetail}>
            <Text>The Meal Details Screen</Text>
            <Button
                title="go back to the first screen"
                onPress={() => {
                    props.navigation.popToTop();
                }}
            ></Button>
        </View>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam("mealId");
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    return {
        headerTitle: selectedMeal.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favorite"
                    iconName="ios-star"
                    onPress={() => {
                        console.log("Mark as favorite!");
                    }}
                />
                <Item
                    title="Favorite2"
                    iconName="ios-star-outline"
                    onPress={() => {
                        console.log("Mark as favorite!");
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    mealdetail: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MealDetailScreen;
