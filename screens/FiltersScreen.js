import React from "react";
import { View, Text, StyleSheet } from "react-native";

import HeaderButton from "../components/HeaderButton";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FiltersScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Meal Details Screen</Text>
        </View>
    );
};
FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Filter Meals",
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

export default FiltersScreen;
