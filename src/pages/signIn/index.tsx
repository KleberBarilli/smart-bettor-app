import React from "react";
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    View,
    Alert,
} from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { useAuth } from "../../context/authContext";

interface ScreenNavigationProp {
    navigate: (screen: string) => void;
}

interface IFormInputs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

const formSchema = yup.object({
    email: yup
        .string()
        .email("Email inválido")
        .required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});

export const SignIn: React.FunctionComponent = () => {
    const { signIn } = useAuth();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const { navigate } = useNavigation<ScreenNavigationProp>();

    const handleSignIn = (form: IFormInputs) => {
        const data = {
            email: form.email,
            password: form.password,
        };

        try {
            signIn(data);
        } catch (error) {
            Alert.alert("Erro ao logar", "Verifique seus dados");
        }
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
                                error={
                                    errors.email &&
                                    (errors.email.message as string)
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
                            <Button
                                title="Entrar"
                                onPress={handleSubmit(handleSignIn)}
                                disabled={
                                    (errors.password as unknown as boolean) ||
                                    (errors.email as unknown as boolean)
                                }
                            />

                            <ForgotPasswordButton
                                onPress={() => navigate("ForgotPassword")}
                            >
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
