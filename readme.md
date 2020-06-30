# meals app

In this app, I will practice how to navigate around screens. The main function of this app will be showing the recipes and visualize them by dividing them in various kinds.

## 1. Environmental settings

> versions

|  expo   | client app's sdk requirement | expo-font |
| :-----: | :--------------------------: | :-------: |
| 3.21.12 |              38              |   8.2.1   |

Make sure the expo client app's sdk version in your virtual devices or your real phone includes 38. Otherwise, the app will show error realted to the sdk version. The only way to fix this error is updating your expo client app.

If the screen shows "Open up App.js to start working on your app!", we are done of setting.

## 2. Use specific fonts and about async

```bash
npm install --save expo-font
```

and add

```js
// App.js
import * as Font from "expo-font";
```

> AppLoading component and Font.loadAsync

Also, download open-sans font from the zip folder and place it under `/assets/fonts/` .

```js
// App.js

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
```

## 3. Navigation

### (1) download the packages

```bash
# At the project directory
npm install --save react-navigation
# go to reactnavigation.org, and copy paste installing dependencies into an Expo managed project code.
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

Make new folder called `/navigation`, and make new js file called `MealsNavigator.js`. Also, if using react navigation v4 or higher, must install the followings in the cmd under our root folder: `meals-app`.

```bash
npm install --save react-navigation-stack
# add `import { createStackNavigator } from 'react-navigation-stack';`
npm install --save react-navigation-tabs
# add `import { createBottomTabNavigator } from 'react-navigation-tabs';`
npm install --save react-navigation-drawer
# add `import { createDrawerNavigator } from 'react-navigation-drawer';`
```

> `createStackNavigator`의 경우, `react-navigation` 라이브러리에 `createAppContainer`와 같이 쓰면 안된다.

즉,

```js
import { createAppContainer, createStackNavigator } from "react-navigation";
```

이렇게 쓰면 안되고,

```js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
```

이렇게 써야 한다.

### (2) importation and props navigation methods

> /navigation/MealsNavigator.js

```js
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
```

> screens\CategoriesScreen.js

```js
// Can select the food category
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CategoriesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen</Text>
            <Button
                title="Go to Meals!"
                onPress={() => {
                    props.navigation.navigate({ routeName: "CategoryMeals" });
                    // props.navigation.navigate('CategoryMeals')
                    // 과 동일한 의미의 코드. 둘이 같은 의미를 가지고 있기 때문에 뭘 써도 상관이 없다고 함(Alternative navigation Syntax)
                }}
            ></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default CategoriesScreen;
```

여기에서 props.navigation.navigate의 routeName key에 대응하는 value값에는 MealsNavigator.js의 createStackNavigator에서 썼던 key값을 string으로 감싸서 쓴다.

> screens\CategoriyMealsScreen.js

pop method, goBack method

```js
const CategoryMealsScreen = (props) => {
    return (
        <View style={styles.screen}>
            {/* 생략 */}
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
```

> screens\MealDetailScreen.js

popToTop method: 제일 처음(가장 밑) 스택을 제외하고 나머지를 다 pop하기

```js
const MealDetailScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Meal Details Screen</Text>
            <Button
                title="go back to the first screen"
                onPress={() => {
                    props.navigation.popToTop();
                }}
            ></Button>
        </View>
    );
};

// 이외는 다 생략
```

++ replace method: 현재 스택을 다른 스택으로 바꿔치기하기.

### (3) Categorys: using flatlist

> /data/dummy-data.js

```js
import Category from "../models/category";

export const CATEGORIES = [
    new Category("c1", "Italian", "#f5428d"),
    new Category("c2", "Quick & Easy", "#f54242"),
    new Category("c3", "Hamburgers", "#f5a442"),
    new Category("c4", "German", "#f5d142"),
    new Category("c5", "Light & Lovely", "#368dff"),
    new Category("c6", "Exotic", "#41d95d"),
    new Category("c7", "Breakfast", "#9eecff"),
    new Category("c8", "Asian", "#b9ffb0"),
    new Category("c9", "French", "#ffc7ff"),
    new Category("c10", "Summer", "#47fced"),
];
```

> /models/category.js

```js
class Category {
    constructor(id, title, color) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}

// 아래 코드 생략하면 에러 뜸: ios, android 각기 다른 에러 뜸(이건 이유 못 알아냄)
export default Category;
```

> /constants/Colors.js

```js
export default {
    primary: "#4a148c",
    accent: "#ffcf00",
};
```

> /screens/CategoriesScreen.js

```js
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({ routeName: "CategoryMeals" });
                }}
            >
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    console.log(props);
    return <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}></FlatList>;
};
```

### (4) option: header styles and title(navigationOptions)

> \screens\CategoryMealsScreen.js

```js
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoryMealsScreen = (props) => {
    // 편의상 생략
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    // navigationData과 CategoryMealsScreen.props가 동일한 내용임.
    const catId = navigationData.navigation.getParam("categoryId");
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    };
};

// 나머지도 편의상 생략
```

매번 모든 스크린에 이 코드를 반복 적용할 수 없으므로

> \navigation\MealsNavigator.js

에서 아래와 같이 적용하여 중복을 없앤다.

```js
// import 생략
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
// export 생략
```

### (5) react-native-screens

```bash
npm install --save react-native-screens
```

/App.js 에서

```js
// 아래 줄은 추가하지 않아도 됨. 아주 약간의 performance 향상이 있을 뿐.
import { enableScreens } from "react-native-screens";

import MealsNavigator from "./navigation/MealsNavigator";

enableScreens();
```
