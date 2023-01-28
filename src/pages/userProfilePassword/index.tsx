import React from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services/api";
import { Button } from "../../components/form/button";
import { InputControl } from "../../components/form/inputControl";
import {
    Container,
    Content,
    GoBackButton,
    Header,
    HeaderTitle,
    Icon,
    Title,
    UserAvatar,
} from "./styles";
import { useAuth } from "../../context/authContext";
import avatarDefault from "../../assets/avatar1.png";

interface ScreenNavigationProp {
    goBack: () => void;
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    old_password: yup.string().required("Campo obrigatório."),
    password: yup.string().required("Campo obrigatório."),
    password_confirmation: yup
        .string()
        .required("Campo obrigatório.")
        .oneOf([yup.ref("password"), null], "Confirmação incorreta."),
});

export const UserProfilePassword: React.FunctionComponent = () => {
    const { user, updateUser } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });

    const { goBack } = useNavigation<ScreenNavigationProp>();

    const handleUpdatePassword = async (form: IFormInputs) => {
        const data = {
            name: user.name,
            email: user.email,
            old_password: form.old_password,
            password: form.password,
            password_confirmation: form.password_confirmation,
        };

        try {
            await api.patch("customer/auth/password", data);
            Alert.alert("Senha atualizada", "Senha atualizada com sucesso.");
            goBack();
        } catch (error) {
            Alert.alert(
                "Erro ao atualizar",
                "Ocorreu um erro ao atualizar a senha. Tente novamente.",
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
                    <Header>
                        <GoBackButton onPress={goBack}>
                            <Icon name="chevron-left" />
                        </GoBackButton>
                        <HeaderTitle>Seu perfil</HeaderTitle>
                        <UserAvatar source={avatarDefault} />
                    </Header>
                    <Content>
                        <Title>Alterar senha</Title>
                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            secureTextEntry
                            name="password"
                            placeholder="Nova senha"
                            error={
                                errors.password &&
                                (errors.password.message as string)
                            }
                        />
                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            secureTextEntry
                            name="password_confirmation"
                            placeholder="Confirmar senha"
                            error={
                                errors.password_confirmation &&
                                (errors.password_confirmation.message as string)
                            }
                        />

                        <Button
                            title="Salvar alterações"
                            onPress={handleSubmit(handleUpdatePassword)}
                            disabled={
                                !!errors.old_password ||
                                !!errors.password ||
                                !!errors.password_confirmation
                            }
                        />
                    </Content>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
