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

## 2. Navigation

### (1) use specific fonts

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
