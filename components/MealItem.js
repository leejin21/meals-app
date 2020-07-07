import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        {/* 아래 코드와 같이 ImageBackground가 Text를 감싸는 형태여야 텍스트 백그라운드에 이미지가 존재함. */}
                        <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {/* numberOfLines prop은 글자가 정해진 칸을 넘어가면 ...으로 생략되게끔 하는 것. */}
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: "100%",
        backgroundColor: "#f5f5f5",
        // 무슨 상관이 있는 건감
        borderRadius: 10,
        overflow: "hidden",
    },
    bgImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    titleContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        // fontFamily: "open-sans-bold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    mealRow: {
        flexDirection: "row",
    },
    mealHeader: {
        height: "90%",
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default MealItem;
