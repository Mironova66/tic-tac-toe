import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Index from '../index';

configure({adapter: new Adapter()});

describe('index component', () => {
  it('if step = 0, should text next player', () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ status: 0 });
    expect(wrapper.contains(<div>Текущий ход: x</div>)).toEqual(true);
  });
  it('if step = 1, should return winner', () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ status: 1 });
    expect(wrapper.contains(<div className="winner">Победил: o</div>)).toEqual(true);
  });
  it('if step = 2, should return draw', () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ status: 2 });
    expect(wrapper.contains(<div className="winner">Ничья</div>)).toEqual(true);
  });
  it('if click on reset button => reset game', () => {
    const wrapper = shallow(<Index />);
    wrapper.setState({ status: 2 });
    wrapper.find('button').simulate('click');
    console.log(wrapper.state());
    expect(wrapper.state()).toEqual({
      squares: [
        null, null, null,
        null, null, null,
        null, null, null
      ],
      step: 0,
      status: 0
    });
  });
});

