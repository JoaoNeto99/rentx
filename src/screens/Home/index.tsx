import React, {useEffect, useState} from "react";
import {BackHandler, StatusBar, StyleSheet} from "react-native";

import {CarList, Container, Header, HeaderContent, TotalCars, MyCarsButton} from "./styles";

import Logo from "../../assets/logo.svg"
import {RFValue} from "react-native-responsive-fontsize";
import {Car} from "../../components/Car";
import {api} from "../../service/api";
import {CarDto} from "../../dtos/CarDto";
import {Load} from "../../components/Load";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes/stack.routes";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "styled-components";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from "react-native-reanimated";
import {RectButton, PanGestureHandler} from "react-native-gesture-handler";
import {LoadAnimation} from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)


export function Home() {

    const [cars, setCars] = useState<CarDto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const theme = useTheme()

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const positionY = useSharedValue(0)
    const positionX = useSharedValue(0)

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value}
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }
    })

    function handleCarDetails(car: CarDto) {
        navigation.navigate('CarDetails', {car})
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars')
    }

    async function fetchCars() {
        try {
            const response = await api.get('/cars')
            setCars(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                translucent={true}
                backgroundColor={"transparent"}
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {
                        !isLoading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }

                </HeaderContent>

            </Header>
            {
                isLoading
                    ? <LoadAnimation/>
                    : <CarList
                        data={cars}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                        }
                    />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.button, {backgroundColor: theme.colors.main}]}
                    >
                        <Ionicons
                            name={"ios-car-sport"}
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>

        </Container>
    )

}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: "center"
    }
})
