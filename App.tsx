import React, {useEffect, useState} from 'react';

import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium
} from "@expo-google-fonts/inter"
import {
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
} from "@expo-google-fonts/archivo"

import {Home} from "./src/screens/Home";

import * as SplashScreen from 'expo-splash-screen';
import {ThemeProvider} from "styled-components";
import theme from "./src/styles/theme";

SplashScreen.preventAutoHideAsync().then();

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
        SplashScreen.hideAsync().then();
    } else {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Home/>
        </ThemeProvider>
    );
}
