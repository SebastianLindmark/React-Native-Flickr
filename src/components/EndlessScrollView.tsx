import React from 'react';
import { ScrollView, NativeScrollEvent } from 'react-native'


interface Props {
    children: any
    onBottomReached: Function,
    paddingToBottom?: number

}

const EndlessScrollView = (props: Props) => {

    const checkAtBottom = (height : number, contentOffset : number, contentSize : number) => {

        //100 150, 200

        //100 + 150 >= 200 - 50

        const paddingToBottom = props.paddingToBottom || 100;
        const atBottom = height + contentOffset >= contentSize - paddingToBottom;

        if (atBottom) {
            props.onBottomReached();
        }
    };

    const onScrollEventFrequencyMillis = 100;

    return (
        <ScrollView scrollEventThrottle={onScrollEventFrequencyMillis} onScroll={(scrollEvent) => {

            checkAtBottom(scrollEvent.nativeEvent.layoutMeasurement.height, 
                        scrollEvent.nativeEvent.contentOffset.y,
                        scrollEvent.nativeEvent.contentSize.height
            )

        }}>
            {props.children}
        </ScrollView>

    )
}

export default EndlessScrollView;