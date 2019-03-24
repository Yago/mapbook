import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import MapGL from '../MapGL';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<MapGL />);

describe('MapGL', () => {
  it('should be defined', () => {
    expect(MapGL).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<MapGL />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
