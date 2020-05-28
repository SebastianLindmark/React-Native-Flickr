import { shallow, ShallowWrapper, mount, ReactWrapper, render } from 'enzyme';
import React from 'react';
import { View } from 'react-native';
import GalleryViewer from './GalleryViewer';
import EndlessScrollView from './EndlessScrollView';
import { WebImage } from './WebResult';
import GalleryImage from './GalleryImage';



const createImages = (): WebImage[] => {

  return Array(5).map(_ => new WebImage('http://test.com'))

}


//    images: WebImage[],
//    onScrollBottom: Function

describe("App", () => {
  describe("rendering", () => {

    const onScrollBottom = jest.fn();

    let wrapper : ShallowWrapper;
    let props: Object;

    const testImages = createImages()
    
    beforeEach(() => {
      wrapper = shallow(<GalleryViewer images={testImages} onScrollBottom={onScrollBottom} />);
    });

    it("should render a <EndlessScrollView />", () => {
      expect(wrapper.find(EndlessScrollView)).toHaveLength(1);
    });

    it('should render multiple <GalleryImage />', () => {
      expect(wrapper.find(View).prop('children')).toHaveLength(testImages.length);
    })

  });
});