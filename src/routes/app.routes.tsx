import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/home";
import { UserProfile } from "../pages/userProfile";
import { UserProfileEdit } from "../pages/userProfileEdit";
import { UserProfilePassword } from "../pages/userProfilePassword";

const App = createNativeStackNavigator();

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <App.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <App.Screen name="Home" component={Home} />
            <App.Screen name="UserProfile" component={UserProfile} />
            <App.Screen name="UserProfileEdit" component={UserProfileEdit} />
            <App.Screen
                name="UserProfilePassword"
                component={UserProfilePassword}
            />
        </App.Navigator>
    );
};
