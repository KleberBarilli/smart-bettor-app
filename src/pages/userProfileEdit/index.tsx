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
} from "./styles";
import { useAuth } from "../../context/authContext";

interface ScreenNavigationProp {
    goBack: () => void;
    navigate: (screen: string) => void;
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    name: yup.string().required("Informe o nome completo."),
    email: yup.string().email("Email inválido.").required("Informe o email."),
});

export const UserProfileEdit: React.FunctionComponent = () => {
    const { user, updateUser, token } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    });

    const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

    const handleProfileEdit = async (form: IFormInputs) => {
        const data = {
            name: form.name,
            email: form.email,
        };
        try {
            const response = await api.put(
                "customer/profile",
                {
                    name: data.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            // updateUser(response.data);
            Alert.alert(
                "Perfil atualizado",
                "Os dados do seu perfil foram atualizados.",
            );
            goBack();
        } catch (error) {
            Alert.alert(
                "Erro ao atualizar",
                "Ocorreu um erro ao atualizar o perfil. Tente novamente.",
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
                        {/* <UserAvatar source={avatarDefault} /> */}
                    </Header>
                    <Content>
                        <Title>Editar dados do perfil</Title>
                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            name="name"
                            placeholder="Nome completo"
                            error={
                                errors.name && (errors.name.message as string)
                            }
                        />
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
                            title="Salvar alterações"
                            onPress={handleSubmit(handleProfileEdit)}
                            //disabled={!!errors.name || !!errors.email}
                        />
                    </Content>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
