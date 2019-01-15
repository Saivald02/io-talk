import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import { getDatabaseAllRooms } from '../../actions/databaseAllRoomsActions';

import Room from '../Room/Room'
export class AllRooms extends React.Component {

  componentDidMount() {
      console.log('------- all rooms database mount --------');

      axios.get('/api/getAllRooms', {
      })
      .then((response) => {
          console.log('response ---------- from database');
          console.log(response.data.data);
          this.props.getDatabaseAllRooms(response.data.data);
      })
      .catch(function (error) {
        console.log('all rooms api error');
        console.log(error);
      });
  }


    render() {
        console.log('--------- all rooms database render ----------');
        console.log(this.props.databaseAllRooms.arr);
        //const { databaseAllUsers } = this.props;
        // { databaseAllUsers.arr.map((one, i) => (<User key={i} user={one.username} />)) }
            if(this.props.databaseAllRooms.arr.length !== 0) {
                return (
                      <div className="chatwindow-child chatwindow-child-allrooms">
                        <div> All channels </div>
                        { this.props.databaseAllRooms.arr.map((one, i) => (<Room key={i} room={one.room} />)) }
                      </div>
                );
            } else {
                return (
                  <p> empty </p>
                );
            }



    }
}


const mapStateToProps = ({ databaseAllRooms }) => {
    return { databaseAllRooms };
}

//export default UsersFromDatabase;
export default connect(mapStateToProps,{ getDatabaseAllRooms })(AllRooms);
