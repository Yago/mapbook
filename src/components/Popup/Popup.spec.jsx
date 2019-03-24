import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Popup from '../Popup';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<Popup />);

describe('Popup', () => {
  it('should be defined', () => {
    expect(Popup).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<Popup />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
