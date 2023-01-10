import React from "react";
import { KeyboardAvoidingView, ScrollView, Platform, View } from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

export const SignUp: React.FunctionComponent = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const { goBack } = useNavigation<ScreenNavigationProp>();

    const handleSignIn = (form: IFormInputs) => {
        const data = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        console.log(data);
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
                            <Title>Crie sua Conta</Title>
                        </View>

                        <InputControl
                            control={control}
                            placeholder="Nome Completo"
                            name="name"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            name="email"
                            placeholder="Email"
                            keyboardType="email-address"
                            error={errors.email && errors.email.message}
                        />
                        <InputControl
                            control={control}
                            name="password"
                            placeholder="Senha"
                            autoCorrect={false}
                            secureTextEntry
                            error={errors.password && errors.password.message}
                        />
                        <Button title="Cadastrar" />
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
