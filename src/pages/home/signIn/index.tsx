import React from "react";
import { ScrollView } from "react-native";
import { Input } from "../../../components/form/input";
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
                </Content>
            </Container>
        </ScrollView>
    );
};
