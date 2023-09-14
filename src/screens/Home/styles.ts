import styled from 'styled-components/native';
import {RFValue} from "react-native-responsive-fontsize";
import {FlatList, FlatListProps} from "react-native";
import {CarDto} from "../../dtos/CarDto";
import {RectButton} from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  
  background-color: ${({theme})=> theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
`;

//FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
export const CarList =  styled(FlatList as new (props: FlatListProps<CarDto>) => FlatList<CarDto>).attrs({
    contentContainerStyle:{
        padding:24
    },
    showsVerticalScrollIndicador: false
})``;

export const MyCarsButton =  styled(RectButton)`
  justify-content: center;
  align-items: center;
  
  border-radius: 30px;
  
  width: 60px;
  height: 60px;

  background-color: ${({theme}) => theme.colors.main};
  
  position: absolute;
  bottom: 13px;
  right: 22px;
`;