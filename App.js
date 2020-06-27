import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppLoading } from "expo";
import * as Font from "expo-font";

const fetchFonts = () => {
    Font.loadAsync({
        "open-sans": require("./assets/fonts/OpneSans-Regular.ttf"),
        "opne-sans-bold": require("./assets/fonts/OpneSans-Bold.ttf"),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
    }
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
