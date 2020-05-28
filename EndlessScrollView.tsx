import React, { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { FlatList, Text, View, StyleSheet, ListRenderItem, ScrollView, NativeScrollEvent } from 'react-native'


interface Props {
    children : any
    onBottomReached : Function,
    paddingToBottom? : number

}

const EndlessScrollView = (props : Props) => {


    const checkAtBottom = (nativeScrollEvent: NativeScrollEvent) => {

        const paddingToBottom = props.paddingToBottom || 100;
        
        let atBottom = nativeScrollEvent.layoutMeasurement.height + nativeScrollEvent.contentOffset.y >=
            nativeScrollEvent.contentSize.height - paddingToBottom;

        if (atBottom) {
           props.onBottomReached();
        }
    };

    
    const onScrollEventFrequencyMillis = 100;

    return (
        <ScrollView scrollEventThrottle={onScrollEventFrequencyMillis} onScroll={(scrollEvent) => checkAtBottom(scrollEvent.nativeEvent)}>
            {props.children}
        </ScrollView>

    )
}

export default EndlessScrollView;