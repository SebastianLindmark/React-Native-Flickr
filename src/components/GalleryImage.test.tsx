import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Image } from 'react-native';
import GalleryImage from './GalleryImage';


describe("App", () => {
  describe("rendering", () => {
    let wrapper: ShallowWrapper;
    let props: Object;
    beforeEach(() => {
      wrapper = shallow(<GalleryImage width={10} height={20} url={'http://test.com'} />);
    });
  
    it("should render a <Image />", () => {
      expect(wrapper.find(Image)).toHaveLength(1);

      let imageSource = wrapper.find(Image).prop('source')
      expect(imageSource).toHaveProperty('uri', 'http://test.com')

      let imageStyle = wrapper.find(Image).prop('style');
      expect(imageStyle).toHaveProperty('width', 10)
      expect(imageStyle).toHaveProperty('height', 20)
    });
  });
});