import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import LayerDial from '../LayerDial';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = mount(<LayerDial />);

describe('LayerDial', () => {
  it('should be defined', () => {
    expect(LayerDial).toBeDefined();
  });

  it('should render correctly', () => {
    const dom = shallow(<LayerDial />);
    expect(dom).toMatchSnapshot();
  });

  // it('should update hooks', () => {
  //   wrapper.simulate('click');
  // });
});
