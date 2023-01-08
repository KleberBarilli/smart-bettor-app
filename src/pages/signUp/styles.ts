import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.dark};
`;

export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 24px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.light};
    margin-bottom: 24px;
`;
export const Logo = styled.Image`
    width: ${RFValue(160)}px;
    height: ${RFValue(160)}px;
    margin-bottom: ${RFValue(64)}px;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
`;

export const BackToSignIn = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.gray800};
    border-top-width: 1px;
    border-color: ${({ theme }) => theme.colors.black};
    padding: 5px 0;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const BackToSignInTitle = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    margin-left: 16px;
`;
