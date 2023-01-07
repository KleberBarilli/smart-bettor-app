import React from "react";
import { ThemeProvider } from "styled-components";
import { Home } from "./src/pages/home";
import theme from "./src/global/styles/theme";

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
};

export default App;
