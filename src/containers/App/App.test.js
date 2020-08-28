import React from 'react';
import { shallow } from 'enzyme';
import {App} from './App';

it('Should render without crashing', () => {
  shallow(<App />);
});
