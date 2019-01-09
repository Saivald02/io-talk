import React from 'react';

export class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            load: []
        };
    }

    componentDidMount() {
        console.log('loading');
    }

    render() {

        //console.log('render loading');

        return (
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          );
      }
}

export default Loading;
