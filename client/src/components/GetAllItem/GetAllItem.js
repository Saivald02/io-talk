import React from 'react';
import { PropTypes } from 'prop-types';

const GetAllItem = ({ all }) => {
    return (
        <li>{all}</li>
    );
};

GetAllItem.propTypes = {
    rooms: PropTypes.string
};

export default GetAllItem;
