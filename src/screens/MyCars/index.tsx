import React, {useEffect, useState} from "react";
import {
    Container,
    Header,
    SubTitle,
    Title,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from "./styles";
import {CarDto} from "../../dtos/CarDto";
import {api} from "../../service/api";
import { FlatList, StatusBar} from "react-native";
import {BackButton} from "../../components/BackButton";
import {useTheme} from "styled-components";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../routes/stack.routes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Car} from "../../components/Car";

import {AntDesign} from "@expo/vector-icons";
import {Load} from "../../components/Load";

interface CarProps {
    id: string;
    user_id: string;
    car: CarDto,
    startDate: string,
    endDate: string
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)

    const theme = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('schedules_byuser?user_id=1')
                setCars(response.data)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchCars()
    }, [])
    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle={"light-content"}
                    translucent={true}
                    backgroundColor={'transparent'}
                />
                <BackButton
                    onPress={handleGoBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma data{`\n`}
                    de início e{`\n`}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>

            </Header>

            {
                loading
                    ? <Load/>
                    : <Content>
                        <Appointments>
                            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                        </Appointments>

                        <FlatList
                            keyExtractor={item => item.id}
                            data={cars}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                                <CarWrapper>
                                    <Car data={item.car}/>
                                    <CarFooter>
                                        <CarFooterTitle>Período</CarFooterTitle>
                                        <CarFooterPeriod>
                                            <CarFooterDate>{item.startDate}</CarFooterDate>
                                            <AntDesign
                                                name={"arrowright"}
                                                size={20}
                                                color={theme.colors.title}
                                                style={{marginHorizontal: 10}}
                                            />
                                            <CarFooterDate>{item.endDate}</CarFooterDate>
                                        </CarFooterPeriod>
                                    </CarFooter>
                                </CarWrapper>
                            )}/>
                    </Content>
            }


        </Container>
    )
}