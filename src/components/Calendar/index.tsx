import React from "react";
import {Feather} from "@expo/vector-icons";

import {Calendar as CustomCalendar, DateData, LocaleConfig} from 'react-native-calendars'

import {useTheme} from "styled-components";
import {ptBR} from "./localeConfig";

LocaleConfig.locales['pt-br'] = {...ptBR}
LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface CalendarProps {
    markedDate: MarkedDateProps;
    onDayPress: (date: DateData) => void
}

function Calendar({markedDate, onDayPress}: CalendarProps) {

    const theme = useTheme()

    return (
        <CustomCalendar
            renderArrow={(direction) =>
                <Feather
                    name={direction == 'left' ? "chevron-left" : "chevron-right"}
                    size={24}
                    color={theme.colors.text}
                />
            }
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textMonthFontFamily: theme.fonts.secondary_600,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={new Date().toString()}

            markingType={"period"}
            markedDates={markedDate}
            onDayPress={onDayPress}
        />
    )

}

export {
    Calendar,
    MarkedDateProps,
    DayProps
}