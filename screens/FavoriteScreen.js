import React from "react";

import { StyleSheet } from "react-native";
import MealList from "../components/MealList";

import { MEALS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FavoriteScreen = (props) => {
    const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");
    return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoriteScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "My Favorites!",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                ></Item>
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default FavoriteScreen;
