// Can select the food category
import React from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CATEGORIES } from "../data/dummy-data";

import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { Header } from "react-native/Libraries/NewAppScreen";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: "CategoryMeals",
                        params: {
                            categoryId: itemData.item.id,
                        },
                    });
                }}
            ></CategoryGridTile>
        );
    };
    // console.log(props);
    return <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}></FlatList>;
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Meal Categories",
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

export default CategoriesScreen;
