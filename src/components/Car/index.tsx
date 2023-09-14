import React from "react";
import {About, Brand, CarImage, Container, Details, Name, Period, Price, Rent, Type} from "./styles";

import GasolineSVG from "../../assets/gasoline.svg"
import {RectButtonProps} from "react-native-gesture-handler";
import {StatusBar} from "react-native";
import {CarDto} from "../../dtos/CarDto";
import {getAccessoryIcon} from "../../utils/getAccessoryIcon";

interface Props extends RectButtonProps {
    data: CarDto
}

export function Car({data, ...rest}: Props) {
    const MotorIcon = getAccessoryIcon(data.fuel_type)
    return (
        <Container {...rest}>
            <StatusBar
                barStyle={"dark-content"}
                translucent={true}
                backgroundColor={"transparent"}
            />
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon/>
                    </Type>
                </About>
            </Details>

            <CarImage
                source={{uri: data.thumbnail}}
                resizeMode={"contain"}
            />
        </Container>
    )

}

//"https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png"