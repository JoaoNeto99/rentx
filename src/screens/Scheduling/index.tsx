import React, {useState} from "react";
import {Container, Content, DateInfo, DateTitle, DateValue, Footer, Header, RentalPeriod, Title} from "./styles";
import {BackButton} from "../../components/BackButton";
import {useTheme} from "styled-components";

import ArrowLeftSVG from '../../assets/arrow.svg'
import {Alert, StatusBar} from "react-native";
import {Button} from "../../components/Button";
import {Calendar, DayProps, MarkedDateProps} from "../../components/Calendar";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes/stack.routes";
import {generateInterval} from "../../components/Calendar/generateInterval";
import {format} from "date-fns";
import {getPlatformDate} from "../../utils/getPlatformDate";

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

export function Scheduling() {

    const theme = useTheme()

    const route = useRoute<RouteProp<RootStackParamList, 'Scheduling'>>()
    const {car} = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    function handleConfirm() {
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        })
    }

    function handleGoBack() {
        navigation.goBack()
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
            endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
        })
    }

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

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowLeftSVG/>

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar
                    markedDate={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button
                    title={"Confirmar"}
                    onPress={handleConfirm}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    )
}