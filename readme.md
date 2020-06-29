# meals app

In this app, I will practice how to navigate around screens.
The main function of this app will be showing the recipes and visualize them by dividing them in various kinds.

## 1. Environmental settings

> versions

|  expo   | client app's sdk requirement | expo-font |
| :-----: | :--------------------------: | :-------: |
| 3.21.12 |              38              |   8.2.1   |

Make sure the expo client app's sdk version in your virtual devices or your real phone includes 38.
Otherwise, the app will show error realted to the sdk version. The only way to fix this error is updating your expo client app.

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

Make new folder called `/navigation`, and make new js file called `MealsNavigator.js`.
Also, if using react navigation v4 or higher, must install the followings in the cmd under our root folder: `meals-app`.

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

### (2)

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
