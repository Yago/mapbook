import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import CategoryDial from '../CategoryDial';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<CategoryDial />);

describe('CategoryDial', () => {
  it('should be defined', () => {
    expect(CategoryDial).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<CategoryDial />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
