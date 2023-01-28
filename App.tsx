import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./src/global/styles/theme";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/context/authContext";
import { StatusBar } from "react-native";

const App: React.FunctionComponent = () => {
    SplashScreen.preventAutoHideAsync();

    const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    if (!isFontsLoaded) {
        return null;
    }

    SplashScreen.hideAsync();
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="transparent" translucent />
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </ThemeProvider>
        </NavigationContainer>
    );
};

export default App;
