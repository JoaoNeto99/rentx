import React from "react";
import {Container, Title, Content, Message, Footer} from "./styles";

import LogoSVG from '../../assets/logo_background_gray.svg'
import DoneSVG from '../../assets/done.svg'
import {StatusBar, useWindowDimensions} from "react-native";
import {ConfirmButton} from "../../components/ConfirmButton";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";

export function SchedulingComplete({navigation}: NativeStackNavigatorProps) {

    const {width} = useWindowDimensions()

    function handleGoBackHome() {
        navigation.navigate('Home')
    }

    return (
        <Container>
            <StatusBar
            barStyle={"light-content"}
            translucent={true}
            backgroundColor={'transparent'}
            />
            <LogoSVG
                width={width}
            />

            <Content>
                <DoneSVG width={80} height={80}/>
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir {`\n`}
                    até a concessionária da RENTX{`\n`}
                    pegar o seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title={"OK"} onPress={handleGoBackHome}/>
            </Footer>

        </Container>

    )

}