import { shallow, ShallowWrapper, mount, ReactWrapper, render } from 'enzyme';
import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import InfiniteScrollView from './InfiniteList';


const createScrollAtBottomEvent = () => {
  return createScrollEvent(100, 1000, 1000);
}
const createScrollAtTopEvent = () => {
  return createScrollEvent(100, 0, 1000);
}

const createScrollEvent = (height: number, contentOffset: number, contentSize: number) => {

  return {
    nativeEvent: {
      layoutMeasurement: { height: height },
      contentOffset: { y: contentOffset },
      contentSize: { height: contentSize }
    }
  }
}

describe("App", () => {
  describe("rendering", () => {

    let props: Object;
    let onScrollBottom: jest.Mock;

    const getRenderedComponent = (padding?: number): ShallowWrapper => {
      return shallow(<InfiniteScrollView
        refreshOn={props}
        customRender={jest.fn()}
        data={[]}
        onBottomReached={onScrollBottom}
        paddingToBottom={padding} />);
    };

    beforeEach(() => {
      onScrollBottom = jest.fn();
    });

    it("should render a <FlatList />", () => {

      const wrapper = getRenderedComponent();

      expect(wrapper.find(FlatList)).toHaveLength(1);
    });

    it("should call onScrollBottom", () => {

      const wrapper = getRenderedComponent();

      let scrollEvent = wrapper.find(FlatList).prop('onScroll') as Function;
      scrollEvent(createScrollAtBottomEvent());
      expect(onScrollBottom).toHaveBeenCalledTimes(1);
    });

    it("should not call onScrollBottom", () => {

      const wrapper = getRenderedComponent();

      let scrollEvent = wrapper.find(FlatList).prop('onScroll') as Function;
      scrollEvent(createScrollAtTopEvent());
      expect(onScrollBottom).toHaveBeenCalledTimes(0);
    });

    it("should call onScrollBottom with padding", () => {

      const scrollViewBottomPadding = 100;
      const wrapper = getRenderedComponent(scrollViewBottomPadding);

      let scrollEvent = wrapper.find(FlatList).prop('onScroll') as Function;
      scrollEvent(createScrollEvent(100, scrollViewBottomPadding, 200));

      expect(onScrollBottom).toHaveBeenCalledTimes(1);
    });

    it("should call not onScrollBottom with padding", () => {

      const scrollViewBottomPadding = 50;
      const wrapper = getRenderedComponent(scrollViewBottomPadding);

      let scrollEvent = wrapper.find(FlatList).prop('onScroll') as Function;
      scrollEvent(createScrollEvent(100, scrollViewBottomPadding - 1, 200));

      expect(onScrollBottom).toHaveBeenCalledTimes(0);
    });




  })
});