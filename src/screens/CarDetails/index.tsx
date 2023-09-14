import React from "react";
import {
    About,
    Accesories,
    CarImages,
    Brand,
    Container,
    Description,
    Details,
    Footer,
    Header,
    Name,
    Period,
    Price,
    Rent,
} from "./styles";
import {BackButton} from "../../components/BackButton";
import {ImageSlider} from "../../components/ImageSlider";
import {Accessory} from "../../components/Accessory";
import {Button} from "../../components/Button";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes/stack.routes";
import {getAccessoryIcon} from "../../utils/getAccessoryIcon";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {StatusBar, StyleSheet} from "react-native";
import {backgroundColor} from "react-native-calendars/src/style";
import {useTheme} from "styled-components";

export function CarDetails() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'CarDetails'>>()
    const {car} = route.params

    const theme = useTheme()

    const scrollY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
        //console.log(event.contentOffset)
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolation.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolation.CLAMP
            )
        }
    })

    function handleSelectRentPeriod() {
        navigation.navigate('Scheduling', {car})
    }

    function handleGoBack() {
        navigation.goBack()
        console.log("handleGoBack")
    }

    return (
        <Container>
            <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={'transparent'}/>

            <Animated.View
                style={[headerStyleAnimation,
                    styles.header,
                    {backgroundColor: theme.colors.background_secondary}]}
            >
                <Header>
                    <BackButton onPress={() => handleGoBack()}/>
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                    <ImageSlider
                        imagesUrl={car.photos}
                    />
                    </CarImages>
                </Animated.View>
            </Animated.View>


            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
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
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accesories>


                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button title={"Escolher período do aluguel"} onPress={handleSelectRentPeriod}/>
            </Footer>

        </Container>
    )

}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1
    }
})
