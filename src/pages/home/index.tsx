import React from "react";
import {
    Container,
    Header,
    UserInfoDetail,
    UserAvatar,
    UserAvatarButton,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    Icon,
    LogoutButton,
} from "./styles";
import avatarDefault from "../../assets/avatar1.png";
import { useAuth } from "../../context/authContext";
import { Alert } from "react-native";

export const Home: React.FunctionComponent = () => {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        Alert.alert("Tem certeza?", "Deseja sair da aplicação", [
            {
                text: "Cancelar",
                onPress: () => {},
            },
            {
                text: "Sair",
                onPress: () => signOut(),
            },
        ]);
    };

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <UserAvatarButton onPress={() => console.log("sd")}>
                            <UserAvatar source={avatarDefault} />
                        </UserAvatarButton>
                        <UserInfoDetail>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>{user.name}</UserName>
                        </UserInfoDetail>
                    </UserInfo>
                    <LogoutButton onPress={handleSignOut}>
                        <Icon name="log-out" />
                    </LogoutButton>
                </UserWrapper>
            </Header>
        </Container>
    );
};
