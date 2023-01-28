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
    signOut(): void;
    updateUser(user: IUser): void;
    token: string;
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

            await Promise.all([
                AsyncStorage.setItem(tokenData, token),
                AsyncStorage.setItem(userData, JSON.stringify(user)),
            ]);

            setData({ token, user });
        } catch (error) {
            Alert.alert("Erro ao logar", "Verifique seus dados");
        }
    };
    const signOut = async () => {
        try {
            await AsyncStorage.removeItem(tokenData);
            await AsyncStorage.removeItem(userData);
            setData({} as IAuthState);
        } catch (error) {
            Alert.alert("Erro ao logar", "Verifique seus dados");
        }
    };

    const updateUser = async (user: IUser) => {
        await AsyncStorage.setItem(userData, JSON.stringify(user));
        setData({
            user,
            token: data.token,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                updateUser,
                token: data.token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContext => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("UseAuth deve ser usado em um auth Provider");
    }
    return context;
};
