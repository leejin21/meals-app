import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealsDetailScreen from "../screens/MealDetailScreen";

const MealsNavigator = createStackNavigator({
    // 아래 코드가 shortcut(짧은 버전)
    Categories: CategoriesScreen,
    // 아래 코드가 longer version
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: MealsDetailScreen,
});

// react navigation은 appContainer을 만들어야함.
export default createAppContainer(MealsNavigator);
