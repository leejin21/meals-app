import { Platform } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import FavoritesScreen from "../screens/FavoriteScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealsDetailScreen from "../screens/MealDetailScreen";
import FiltersScreeen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MealsNavigator = createStackNavigator(
    {
        // 아래 코드가 shortcut(짧은 버전)
        Categories: CategoriesScreen,
        // 아래 코드가 longer version
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealsDetailScreen,
    },
    {
        // createStackNavigator의 두번쨰 인자에 쓰인 defaultNavigationOptions는 세팅한 모든 요소들에 대해 디폴트 값을 세팅해 준다. 그런데 해당 스크린에서 설정을 따로 해 주면 그 설정이 우선순위가 앞선다.
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const favNavigatior = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealsDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                // color={tabInfo.tintColor}는 현재 tab의 tint된 color를 가져온다.
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === "android" ? <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text> : "Meals",
        },
    },
    Favorites: {
        screen: favNavigatior,
        navigationOptions: {
            tabBarLabel: "Favorites!",
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accent,
            tabBarLabel: Platform.OS === "android" ? <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text> : "Favorites",
        },
    },
};

const FiltersNavigator = createStackNavigator(
    { Filters: FiltersScreeen },
    {
        // navigationOptions: { drawerLabel: "Filters!" },
        defaultNavigationOptions: defaultStackNavOptions,
    }
);

const MealsFavTabNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
              activeColor: "white",
              shifting: true,
              // if shifting is true, then barstyle 적용 안됨.
              barStyle: {
                  backgroundColor: Colors.primary,
              },
              tabBarLabel: <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>,
          })
        : createBottomTabNavigator(tabScreenConfig, { tabBarOptions: { labelStyle: { fontFamily: "open-sans" }, activeTintColor: Colors.accent } });

const mainNavigator = createDrawerNavigator(
    {
        MealsFavs: { screen: MealsFavTabNavigator, navigationOptions: { drawerLabel: "Meals" } },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: { activeTintColor: Colors.accent },
    }
);

// react navigation은 appContainer을 만들어야함.
// 어차피 하나로 묶여있으므로.
export default createAppContainer(mainNavigator);
