import React from 'react';
import { shallow } from 'enzyme';
import {TopBanner} from './TopBanner';

it('Should render without crashing', () => {
    shallow(<TopBanner />);
});
