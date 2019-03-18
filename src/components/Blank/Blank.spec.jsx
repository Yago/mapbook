import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Blank from '../Blank';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<Blank />);

describe('Blank', () => {
  it('should be defined', () => {
    expect(Blank).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<Blank />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
