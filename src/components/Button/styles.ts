import styled from 'styled-components/native';
import {RFValue} from "react-native-responsive-fontsize";
import {RectButton, RectButtonProps} from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
    color: string | undefined;
}

interface ButtonTextProps {
    light: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  justify-content: center;
  background-color: ${({theme, color}) =>
          color ? color : theme.colors.main};
  margin-bottom: 8px;
  margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;

  color: ${({theme, light}) => light ?theme.colors.header : theme.colors.shape};
  text-align: center;
`;
