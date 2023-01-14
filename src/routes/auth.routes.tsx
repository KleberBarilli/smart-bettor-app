import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";
import { ForgotPassword } from "../pages/forgotPassword";

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FunctionComponent = () => {
    return (
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};
