import React from 'react';
import { FlatList, StyleSheet } from 'react-native'


interface Props {
    data: any,
    customRender: any
    onBottomReached: Function,
    paddingToBottom?: number
    numCols? : number
    refreshOn : any
}

const InfiniteScrollView: React.FC<Props> = props => {


    const checkAtBottom = (height: number, contentOffset: number, contentSize: number) => {

        const paddingToBottom = props.paddingToBottom || 100;
        const atBottom = height + contentOffset >= contentSize - paddingToBottom;

        if (atBottom) {
            props.onBottomReached();
        }
    };

    return (

        <FlatList
            style={style.container}
            extraData={props.refreshOn}
            numColumns={props.numCols ? props.numCols : 1}
            data={props.data}
            key={props.numCols}
            keyExtractor={(_, index) => index.toString()}
            onScroll={scrollEvent =>
                checkAtBottom(scrollEvent.nativeEvent.layoutMeasurement.height,
                    scrollEvent.nativeEvent.contentOffset.y,
                    scrollEvent.nativeEvent.contentSize.height)}
            renderItem={(item) => props.customRender(item.item)}
        />

    )
}

const style = StyleSheet.create({
    container : {
        width : '100%'
    }
})

export default InfiniteScrollView;