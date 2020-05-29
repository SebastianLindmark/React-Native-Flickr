import React from 'react';
import { ScrollView } from 'react-native'


interface Props {
    children: any
    onBottomReached: Function,
    paddingToBottom?: number
}

const InfiniteScrollView: React.FC<Props> = props => {

    const checkAtBottom = (height: number, contentOffset: number, contentSize: number) => {

        const paddingToBottom = props.paddingToBottom || 100;
        const atBottom = height + contentOffset >= contentSize - paddingToBottom;

        if (atBottom) {
            props.onBottomReached();
        }
    };

    const onScrollEventFrequencyMillis = 100;

    return (

        <ScrollView scrollEventThrottle={onScrollEventFrequencyMillis} onScroll={scrollEvent =>
            checkAtBottom(scrollEvent.nativeEvent.layoutMeasurement.height,
                scrollEvent.nativeEvent.contentOffset.y,
                scrollEvent.nativeEvent.contentSize.height)}>

            {props.children}

        </ScrollView>
    )
}

export default InfiniteScrollView;