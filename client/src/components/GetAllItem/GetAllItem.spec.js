import React from 'react';
import { shallow } from 'enzyme';
import GetAllItem from './GetAllItem';

describe('GetAllItem tests', () => {
    it('should contain the item provided', () => {

        const component = shallow(<GetAllItem all={'Hello!'} />);
        expect(component.find('li').text()).toEqual('Hello!');
    });
});
