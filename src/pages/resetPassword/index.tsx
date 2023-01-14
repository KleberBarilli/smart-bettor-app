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
    token: yup.number().min(6).max(6),
    password: yup.string().required("A nova senha é obrigatória"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Confirmação incorreta")
        .required("Confirme a senha"),
});

export const ResetPassword: React.FunctionComponent = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

    const handleResetPassword = async (form: IFormInputs) => {
        const data = {
            token: form.token,
            password: form.password,
            passwordConfirm: form.passwordConfirm,
        };
        try {
            await api.post("/customer/auth/reset-password", data);
            Alert.alert(
                "Senha alterada",
                "A sua senha foi alterada com sucesso",
            );
            navigate("SignIn");
        } catch (error) {
            Alert.alert(
                "Erro ao redefinir a senha",
                "Ocorreu um erro ao redefinir a senha",
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
                            <Title>Redefinir Senha</Title>
                        </View>

                        <InputControl
                            control={control}
                            placeholder="Código"
                            name="token"
                            autoCorrect={false}
                            error={
                                errors.token && (errors.token.message as string)
                            }
                        />

                        <InputControl
                            control={control}
                            name="password"
                            placeholder="Senha"
                            autoCorrect={false}
                            secureTextEntry
                            error={
                                errors.password &&
                                (errors.password.message as string)
                            }
                        />
                        <InputControl
                            control={control}
                            name="confirmationPassword"
                            placeholder="Confirme a senha"
                            autoCorrect={false}
                            secureTextEntry
                            error={
                                errors.passwordConfirm &&
                                (errors.passwordConfirm.message as string)
                            }
                        />
                        <Button
                            title="Alterar a senha"
                            onPress={handleSubmit(handleResetPassword)}
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
