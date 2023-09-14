import React, {useRef, useState} from "react";
import {Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage} from "./styles";
import {FlatList, ViewToken} from "react-native";

interface Props {
    imagesUrl: string[]
}

interface ChangeImageProps {
    viewableItems: ViewToken[],
    changed: ViewToken[]
}

export function ImageSlider({imagesUrl}: Props) {
    const [imageIndex, setImageIndex] = useState(0)

    const onViewableItemsChanged = (info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!
        setImageIndex(index)
        console.log(index)
    }

    const indexChanged = useRef(onViewableItemsChanged)

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((_, index) => (
                        <ImageIndex
                            key={String(index)}
                            active={index === imageIndex}
                        />
                    ))
                }
            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={(item) => item}
                renderItem={
                    ({item}) => (
                        <CarImageWrapper>
                            <CarImage
                                source={{uri: item}}
                                resizeMode={"contain"}
                            />
                        </CarImageWrapper>

                    )
                }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
                //viewabilityConfigCallbackPairs={indexChanged.current}
            />


        </Container>
    )

}