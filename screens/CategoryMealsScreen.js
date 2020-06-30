import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";

// 아래 줄에서 {} 안 쓰면 오류 뜸.
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoryMealsScreen = (props) => {
    const catId = props.navigation.getParam("categoryId");
    // console.log(catId);
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
    // console.log(selectedCategory);

    return (
        <View style={styles.screen}>
            <Text>The Category meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button
                title="Go to details"
                onPress={() => {
                    props.navigation.navigate({
                        routeName: "MealDetail",
                    });
                }}
            ></Button>
            <Button
                title="Go back"
                onPress={() => {
                    props.navigation.goBack();
                    // props.navigation.pop();
                    // pop의 경우 stackNavigator의 경우에 쓰임.
                }}
            ></Button>
        </View>
    );
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CategoryMealsScreen;
