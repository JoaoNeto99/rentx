import React, {useEffect} from "react";
import {Container} from "./styles"
import {Dimensions} from "react-native";
import Animated, {
    Extrapolation,
    interpolate, runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes/stack.routes";

const WIDTH = Dimensions.get('window').width

export function Splash() {
    const splashAnimation = useSharedValue(0)
    const navigation =  useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            transform:[
                {
                    translateX: interpolate(splashAnimation.value,[0, 50], [0, -50])
                }
            ]
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 25,50], [0, .3, 1]),
            transform:[
                {
                    translateX: interpolate(splashAnimation.value,[0, 50], [-50, 0], Extrapolation.CLAMP)
                }
            ]
        }
    })

    function startApp() {
        navigation.navigate('Home')
    }

    useEffect(() => {
        splashAnimation.value = withTiming(1, {duration: 1000},
            () => {
            'worklet'
                runOnJS(startApp)()
            })
    },[])

    return (
        <Container>
            <Animated.View style={[brandStyle, {position: 'absolute'}]}>
                <BrandSvg width={80} height={50}/>
            </Animated.View>
            <Animated.View style={[logoStyle, {position: 'absolute'}]}>
                <LogoSvg width={180} height={20}/>
            </Animated.View>
        </Container>
    )
}
