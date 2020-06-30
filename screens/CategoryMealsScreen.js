import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CategoryMealsScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Category meals Screen</Text>
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
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CategoryMealsScreen;
