import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Auth from '../Auth';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<Auth />);

describe('Auth', () => {
  it('should be defined', () => {
    expect(Auth).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<Auth />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
