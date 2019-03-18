import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Map from '../Map';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<Map />);

describe('Map', () => {
  it('should be defined', () => {
    expect(Map).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<Map />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
