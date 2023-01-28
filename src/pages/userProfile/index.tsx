import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Content,
    EmailData,
    EmailTitle,
    GoBackButton,
    Header,
    HeaderTitle,
    Icon,
    NameData,
    NameTitle,
    UserEmailDetail,
    UserNameDetail,
    HeaderTop,
} from "./styles";

import { useAuth } from "../../context/authContext";
import { Button } from "../../components/form/button";

interface ScreenNavigationProp {
    goBack: () => void;
    navigate: (screen: string) => void;
}

export const UserProfile: React.FunctionComponent = () => {
    const { user } = useAuth();
    const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

    return (
        <Container>
            <Header>
                <HeaderTop>
                    <GoBackButton onPress={goBack}>
                        <Icon name="chevron-left" />
                    </GoBackButton>
                    <HeaderTitle>Seu Perfil</HeaderTitle>
                </HeaderTop>
                {/* <PhotoContainer>
                    <UserAvatar source={avatarDefault} />
                    <PhotoButton>
                        <Icon name="camera" />
                    </PhotoButton>
                </PhotoContainer> */}
            </Header>

            <Content>
                <UserNameDetail>
                    <NameTitle>Nome</NameTitle>
                    <NameData>{user.name}</NameData>
                </UserNameDetail>

                <UserEmailDetail>
                    <EmailTitle>Email</EmailTitle>
                    <EmailData>{user.email}</EmailData>
                </UserEmailDetail>

                <Button
                    title="Editar dados do perfil"
                    onPress={() => navigate("UserProfileEdit")}
                />
                <Button
                    title="Trocar senha"
                    onPress={() => navigate("UserProfilePassword")}
                />
            </Content>
        </Container>
    );
};
