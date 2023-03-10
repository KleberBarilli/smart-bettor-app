import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../input";
import { Container, Error } from "./styles";

interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: string | undefined;
}

export const InputControl: React.FunctionComponent<Props> = ({
    control,
    name,
    error,
    ...otherProps
}) => {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...otherProps}
                    />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
};
