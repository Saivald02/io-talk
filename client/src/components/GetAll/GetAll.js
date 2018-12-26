import React from 'react';
import { PropTypes } from 'prop-types';

const GetAll = ({ children }) => {

    return <ul className="">{children}</ul>
};

GetAll.propTypes = {
    children: PropTypes.node
};

export default GetAll;
