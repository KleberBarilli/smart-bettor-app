import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { IUser } from "../model/user";

interface IAuthState {
    token: string;
    user: IUser;
}
interface ICredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: IUser;
    signIn(credentials: ICredentials): void;
}

interface IProps {
    children: React.ReactElement;
}
export const AuthContext = React.createContext<IAuthContext>(
    {} as IAuthContext,
);

const tokenData = "@Smart:token";
const userData = "@Smart:user";

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
    const [data, setData] = React.useState<IAuthState>({} as IAuthState);

    React.useEffect(() => {
        async function loadAuthData() {
            const token = await AsyncStorage.getItem(tokenData);
            const user = await AsyncStorage.getItem(userData);

            if (token && user) {
                setData({ token, user: JSON.parse(user) });
            }
        }
        loadAuthData();
    }, []);
    const signIn = async ({ email, password }: ICredentials) => {
        try {
            const response = await api.post("customer/login", {
                email,
                password,
            });
            const { token, user } = response.data;

            console.log(response.data);
            await AsyncStorage.setItem(tokenData, token);
            await AsyncStorage.setItem(userData, JSON.stringify(user));
            setData({ token, user });
        } catch (error) {
            Alert.alert("Erro ao logar", "Verifique seus dados");
        }
    };

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
