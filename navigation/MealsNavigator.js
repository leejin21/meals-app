import { Platform } from "react-native";
import Colors from "../constants/Colors";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealsDetailScreen from "../screens/MealDetailScreen";

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
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.primary : "",
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        },
    }
);

// react navigation은 appContainer을 만들어야함.
export default createAppContainer(MealsNavigator);
