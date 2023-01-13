import React from "react";
import {StatusBar} from "react-native";

import {
    Container,
    Header,
    TotalCars,
    HeaderContent
} from "./styles";

import Logo from "../../assets/logo.svg"
import {RFValue} from "react-native-responsive-fontsize";
import {Car} from "../../components/Car";

export function Home() {
    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                translucent={true}
                backgroundColor={"transparent"}/>
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>

            </Header>
            <Car  />

        </Container>
    )

}