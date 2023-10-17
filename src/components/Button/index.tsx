import React from "react";
import {Container, Title} from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";
import {ActivityIndicator} from "react-native";
import {useTheme} from "styled-components";

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    enabled?: boolean;
    loading?: boolean;
    light?: boolean;
}

export function Button({title, color, enabled = true, loading = false, light = false, ...rest}: Props) {
    const theme = useTheme()

    return (
        <Container
            {...rest}
            color={color}
            enabled={enabled}
            style={{opacity: (enabled == false || loading == true) ? .5 : 1}}
        >
            {
                loading
                    ? <ActivityIndicator color={theme.colors.shape}/>
                    : <Title light={light}>{title}</Title>
            }
        </Container>
    )

}
