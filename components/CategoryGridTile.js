import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from "react-native";

const CategoryGridTile = (props) => {
    let TouchableComp = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableComp style={{ flex: 1 }} onPress={props.onSelect}>
                {/* FIXED: 아래 코드에서 ...은 객체를 풀어주는 코드라는 것 명심하기. 따라서 ... 겉에는 {}로 한 번 더 감싸야 함!! */}
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLines={2}>
                        {props.title}
                    </Text>
                </View>
            </TouchableComp>
        </View>
    );
};
const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === "android" && Platform.Version === 21 ? "hidden" : "visible",
        marginVertical: 10,
        elevation: 5,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },

        padding: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    title: {
        // FIXME: 아래 거 주석처리하고 켜야 함:
        // fontFamily: "open-sans-bold",
        fontSize: 23,
        textAlign: "right",
    },
});

export default CategoryGridTile;
