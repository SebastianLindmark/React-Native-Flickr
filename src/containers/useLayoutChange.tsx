import React, { useLayoutEffect, useState, useCallback } from 'react';
import {Platform, Dimensions, View, StyleSheet, LayoutChangeEvent } from 'react-native';


const useLayoutChange = (initialState : any)  => {
    
    const [imageSize, setImageSize] = useState(initialState);

    const onLayoutChange: any = useCallback((event: LayoutChangeEvent) => {

        const updatedLayout = event.nativeEvent.layout;
        if(updatedLayout.width <= 0 || updatedLayout.height <= 0) return;

        setImageSize({width : updatedLayout.width,height : updatedLayout.height});

    }, [])

    return [imageSize, onLayoutChange];
}


export default useLayoutChange;
