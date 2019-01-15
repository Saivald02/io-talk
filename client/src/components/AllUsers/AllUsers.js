import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import { getDatabaseAllUsers } from '../../actions/databaseAllUsersActions';

import User from '../User/User'
export class AllUsers extends React.Component {

  componentDidMount() {
      console.log('------- all users database mount --------');

      axios.get('/api/getAllUsers', {
      })
      .then((response) => {
          console.log('response ---------- from database');
          console.log(response.data.data);
          this.props.getDatabaseAllUsers(response.data.data);
      })
      .catch(function (error) {
        console.log('allusers api error');
        console.log(error);
      });

  }


    render() {
        console.log('--------- all users database render ----------');
        console.log(this.props.databaseAllUsers.arr);
        //const { databaseAllUsers } = this.props;
        // { databaseAllUsers.arr.map((one, i) => (<User key={i} user={one.username} />)) }
            if(this.props.databaseAllUsers.arr.length !== 0) {
                return (
                      <div className="chatwindow-child chatwindow-child-allusers">
                        <div> All users </div>
                        { this.props.databaseAllUsers.arr.map((one, i) => (<User key={i} user={one.username} />)) }
                      </div>
                );
            } else {
                return (
                    null
                );
            }



    }
}


const mapStateToProps = ({ databaseAllUsers }) => {
    return { databaseAllUsers };
}

//export default UsersFromDatabase;
export default connect(mapStateToProps,{ getDatabaseAllUsers })(AllUsers);
