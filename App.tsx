import React from "react";
import { ThemeProvider } from "styled-components";
import { Home } from "./src/pages/home";
import theme from "./src/global/styles/theme";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { SignIn } from "./src/pages/home/signIn";

const App: React.FunctionComponent = () => {
    const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    if (!isFontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ThemeProvider theme={theme}>
            {/* <Home /> */}
            <SignIn />
        </ThemeProvider>
    );
};

export default App;
