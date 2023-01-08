import React from "react";
import { ScrollView } from "react-native";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/input/button";
import { Content, Title, Container } from "./styles";

export const SignUp: React.FunctionComponent = () => {
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
        >
            <Container>
                <Content>
                    <Title>Crie sua Conta</Title>
                    <Input placeholder="Nome Completo" />
                    <Input placeholder="Email" />
                    <Input placeholder="Senha" />
                    <Button title="Cadastrar" />
                </Content>
            </Container>
        </ScrollView>
    );
};
