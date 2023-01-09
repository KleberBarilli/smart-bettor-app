import React from "react";
import { ScrollView, KeyboardAvoidingView, Platform, View } from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/form/button";
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
import { InputControl } from "../../components/form/inputControl";

interface ScreenNavigationProp {
    navigate: (screen: string) => void;
}

interface IFormInputs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

export const SignIn: React.FunctionComponent = () => {
    const { control, handleSubmit } = useForm<FieldValues>();

    const { navigate } = useNavigation<ScreenNavigationProp>();

    const handleSignIn = (form: IFormInputs) => {
        const data = {
            email: form.email,
            password: form.password,
        };
        console.log(data);
    };

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
                            <InputControl
                                autoCapitalize="none"
                                autoCorrect={false}
                                control={control}
                                name="email"
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                            <InputControl
                                control={control}
                                name="password"
                                placeholder="Senha"
                                autoCorrect={false}
                                secureTextEntry
                            />
                            <Button
                                title="Entrar"
                                onPress={() => handleSubmit(handleSignIn)}
                            />

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
