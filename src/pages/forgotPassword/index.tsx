import React from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    View,
    Alert,
} from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services/api";
import { InputControl } from "../../components/form/inputControl";
import { Button } from "../../components/form/button";
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

interface ScreenNavigationProp {
    goBack: () => void;
    navigate: (screen: string) => void;
}
interface IFormInputs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

const formSchema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
        .string()
        .email("Email inválido")
        .required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});

export const ForgotPassword: React.FunctionComponent = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

    const handleForgotPassword = async (form: IFormInputs) => {
        const data = {
            email: form.email,
        };
        try {
            await api.post("/customer/auth/forgot-password", data);
            Alert.alert(
                "Email enviado",
                "Caso tenha uma conta cadastrada, ennviaremos um email de redefinição de senha",
            );
            navigate("SignIn");
        } catch (error) {
            Alert.alert(
                "Erro ao recuperar a senha",
                "Ocorreu um erro ao recuperar a senha",
            );
        }
    };

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
                            <Title>Esqueci minha senha</Title>
                        </View>

                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            name="email"
                            placeholder="Email"
                            keyboardType="email-address"
                            error={
                                errors.email && (errors.email.message as string)
                            }
                        />
                        <Button
                            title="Recuperar Senha"
                            onPress={handleSubmit(handleForgotPassword)}
                        />
                    </Content>
                </Container>
            </ScrollView>
            <BackToSignIn
                onPress={() => {
                    goBack();
                }}
            >
                <Icon name="arrow-left" />
                <BackToSignInTitle>Voltar para Login</BackToSignInTitle>
            </BackToSignIn>
        </KeyboardAvoidingView>
    );
};
