import React from "react";
import { ScrollView } from "react-native";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/input/button";
import theme from "../../global/styles/theme";
import { Content, Title, Container } from "./styles";

export const SignIn: React.FunctionComponent = () => {
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
        >
            <Container>
                <Content>
                    <Title>Faça seu Login</Title>
                    <Input placeholder="Email" />
                    <Input placeholder="Senha" />
                    <Button title="Entrar" />
                </Content>
            </Container>
        </ScrollView>
    );
};
