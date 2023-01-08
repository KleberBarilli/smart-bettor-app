import React from "react";
import { KeyboardAvoidingView, ScrollView, Platform, View } from "react-native";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/input/button";
import {
    Content,
    Title,
    Container,
    Logo,
    BackToSignIn,
    Icon,
    BackToSignInTitle,
} from "./styles";
import logo from "../../assets/logo.png";

export const SignUp: React.FunctionComponent = () => {
    return (
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
                            <Title>Crie sua Conta</Title>
                        </View>

                        <Input placeholder="Nome Completo" />
                        <Input placeholder="Email" />
                        <Input placeholder="Senha" />
                        <Button title="Cadastrar" />
                    </Content>
                </Container>
            </ScrollView>
            <BackToSignIn>
                <Icon name="arrow-left" />
                <BackToSignInTitle>Voltar para Login</BackToSignInTitle>
            </BackToSignIn>
        </KeyboardAvoidingView>
    );
};
