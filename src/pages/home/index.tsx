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
} from "./styles";
import avatarDefault from "../../assets/avatar1.png";

export const Home: React.FunctionComponent = () => {
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
                            <UserName>Kleber</UserName>
                        </UserInfoDetail>
                    </UserInfo>
                </UserWrapper>
            </Header>
        </Container>
    );
};
