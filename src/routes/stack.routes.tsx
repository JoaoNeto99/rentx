import React from 'react';
import {Home} from "../screens/Home";
import {CarDetails} from "../screens/CarDetails";
import {Scheduling} from "../screens/Scheduling";
import {SchedulingDetails} from "../screens/SchedulingDetails";
import {SchedulingComplete} from "../screens/SchedulingComplete";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {CarDto} from "../dtos/CarDto";
import {MyCars} from "../screens/MyCars";
import {Splash} from "../screens/Splash";
import {SignIn} from "../screens/SignIn";

export type RootStackParamList = {
    Splash: undefined;
    SignIn: undefined;
    Home: undefined;
    CarDetails: { car: CarDto };
    Scheduling: { car: CarDto };
    SchedulingDetails: { car: CarDto; dates: string[]; };
    SchedulingComplete: undefined;
    MyCars: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>()

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'SignIn'}
        >
            <Screen
                name={"SignIn"}
                component={gestureHandlerRootHOC(SignIn)}
            />
            <Screen
                name={"Home"}
                component={gestureHandlerRootHOC(Home)}
                options={{gestureEnabled: false}}
            />
            <Screen
                name={"CarDetails"}
                component={gestureHandlerRootHOC(CarDetails)}
            />
            <Screen
                name={"Scheduling"}
                component={gestureHandlerRootHOC(Scheduling)}
            />
            <Screen
                name={"SchedulingDetails"}
                component={gestureHandlerRootHOC(SchedulingDetails)}
            />
            <Screen
                name={"SchedulingComplete"}
                component={gestureHandlerRootHOC(SchedulingComplete)}
            />
            <Screen
                name={"MyCars"}
                component={gestureHandlerRootHOC(MyCars)}
            />
        </Navigator>
    )
}
