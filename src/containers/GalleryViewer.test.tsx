import { shallow, ShallowWrapper, mount, ReactWrapper, render } from 'enzyme';
import React from 'react';
import { View } from 'react-native';
import GalleryViewer from './GalleryViewer';
import EndlessScrollView from '../components/InfiniteList';
import { WebImage } from '../components/WebResult';


const createMockImages = (): WebImage[] => {
  return Array(5).map(_ => new WebImage('http://test.com'))
}


describe("App", () => {
  describe("rendering", () => {

    let wrapper: ShallowWrapper;

    const testImages = createMockImages()

    beforeEach(() => {
      wrapper = shallow(<GalleryViewer images={testImages} onScrollBottom={jest.fn()} />);
    });

    it("should render a <EndlessScrollView />", () => {
      expect(wrapper.find(EndlessScrollView)).toHaveLength(1);
    });

    /*it('should render multiple <GalleryImage />', () => {
      expect(wrapper.)
      expect(wrapper.find(View).at(1).prop('children')).toHaveLength(testImages.length);
    })

  });
});