import React from "react";
import { ScrollView, KeyboardAvoidingView, Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/input/button";
import {
    Content,
    Title,
    Container,
    Logo,
    ForgotPasswordButton,
    ForgotPasswordTitle,
    CreateAccountTitle,
    CreateAccount,
} from "./styles";
import logo from "../../assets/logo.png";
import { Icon } from "../home/styles";

interface ScreenNavigationProp {
    navigate: (screen: string) => void;
}

export const SignIn: React.FunctionComponent = () => {
    const { navigate } = useNavigation<ScreenNavigationProp>();

    return (
        <>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Content>
                            <Logo source={logo} />
                            <View>
                                <Title>Faça seu Login</Title>
                            </View>
                            <Input placeholder="Email" />
                            <Input placeholder="Senha" />
                            <Button title="Entrar" />

                            <ForgotPasswordButton>
                                <ForgotPasswordTitle>
                                    Esqueci minha senha
                                </ForgotPasswordTitle>
                            </ForgotPasswordButton>
                        </Content>
                    </Container>
                </ScrollView>
                <CreateAccount
                    onPress={() => {
                        navigate("SignUp");
                    }}
                >
                    <Icon name="log-in" />
                    <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
                </CreateAccount>
            </KeyboardAvoidingView>
        </>
    );
};
