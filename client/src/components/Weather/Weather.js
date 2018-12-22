import React from 'react';

import Iceland from '../Iceland/Iceland';
import Oldusel from '../Oldusel/Oldusel';

export class Weather extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Iceland />
                <Oldusel />
            </div>
        );
    }
}

export default Weather;
