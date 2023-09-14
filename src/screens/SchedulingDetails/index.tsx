import React, {useEffect, useState} from "react";
import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accesories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuote,
    RentalPriceTotal
} from "./styles";
import {BackButton} from "../../components/BackButton";
import {ImageSlider} from "../../components/ImageSlider";
import {Accessory} from "../../components/Accessory";

import speedSVG from "../../assets/speed.svg"
import accelerationSVG from "../../assets/acceleration.svg"
import forceSVG from "../../assets/force.svg"
import gasolineSVG from "../../assets/gasoline.svg"
import exchangeSVG from "../../assets/exchange.svg"
import peopleSVG from "../../assets/people.svg"
import {Button} from "../../components/Button";
import {Feather} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";
import {useTheme} from "styled-components";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes/stack.routes";
import {getAccessoryIcon} from "../../utils/getAccessoryIcon";
import {format} from "date-fns";
import {getPlatformDate} from "../../utils/getPlatformDate";
import {api} from "../../service/api";
import {Alert} from "react-native";

interface RentalPeriod {
    start:string;
    end: string;
}

export function SchedulingDetails() {
    const theme = useTheme()

    const [loading, setLoading] = useState(false)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'SchedulingDetails'>>()

    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const {car, dates} = route.params
    const rentTotal = Number(dates.length * Number(car.rent.price))

    async function handleConfirmRent() {
        setLoading(true)
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ]

        api.post(`/schedules_byuser`, {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
            .then((resolve) => {})
            .catch((error) => {})

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then((resolve) => navigation.navigate('SchedulingComplete'))
            .catch((error) => {
                Alert.alert("Não foi possivel confirmar o agendamento")
                setLoading(false)
            })
    }

    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleGoBack}/>
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accesories>
                    {
                        car.accessories.map((item) => (
                            <Accessory
                                key={item.type}
                                name={item.name}
                                icon={getAccessoryIcon(item.type)}/>
                        ))
                    }
                </Accesories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name={"calendar"}
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name={"chevron-right"}
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuote>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuote>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>

                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title={"Alugar agora"}
                    color={theme.colors.success}
                    onPress={handleConfirmRent}
                    loading={loading}
                    enabled={!loading}
                />
            </Footer>

        </Container>
    )

}