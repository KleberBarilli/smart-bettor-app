import React from "react";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./src/global/styles/theme";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";
import { AuthContext, AuthProvider } from "./src/context/authContext";
import { StatusBar } from "react-native";

const App: React.FunctionComponent = () => {
    const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    if (!isFontsLoaded) {
        return <AppLoading />;
    }
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
