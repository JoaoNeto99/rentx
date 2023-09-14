import 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react';

import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter"
import {Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold} from "@expo-google-fonts/archivo"

import {ThemeProvider} from "styled-components";
import theme from "./src/styles/theme";
import {Routes} from "./src/routes";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Archivo_400Regular,
        Archivo_500Medium,
        Archivo_600SemiBold
    })

    useEffect(() => {
        if (fontsLoaded) setAppIsReady(true);
        setTimeout(() => {
        }, 2000)
    }, [fontsLoaded]);

    if (appIsReady) {
        // setTimeout(async () => {
        //     await SplashScreen.hideAsync();
        // }, 2000);
    } else {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Routes/>
        </ThemeProvider>
    );
}
