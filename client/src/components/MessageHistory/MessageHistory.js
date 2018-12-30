
import React from 'react';
import axios from "axios";

//import socketIOClient from "socket.io-client";


export class MessageHistory extends React.Component {
    constructor() {
        super();
        this.state = {
          data: [],
          id: 0,
          message: null,
          intervalIsSet: false,
          idToDelete: null,
          idToUpdate: null,
          objectToUpdate: null
        };
    }

    componentDidMount() {
        //this.getDataFromDb();
        this.getPrivateMessageHistory();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }


    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
    }
    getPrivateMessageHistory = () => {

      axios.get('/api/getPrivateMessageHistory', {
          params: {
            sender: 'dead',
            receiver: 'new'
          }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
        /*
        axios.get('/api/getPrivateMessageHistory?sender=dead?receiver=new')
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        */
    }

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {

      fetch("/api/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
    };


    putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };


  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
    render() {
        const { data } = this.state;
        return (
            <div>
                <ul>
                    {data.length <= 0
                        ? "NO DB ENTRIES YET"
                        : data.map(dat => (
                            <li style={{ padding: "10px" }} key={data.message}>
                                <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                                <span style={{ color: "gray" }}> data: </span>
                                {dat.message}
                            </li>
                      ))}
                </ul>
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ message: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: "200px" }}
                    />
                    <button onClick={() => this.putDataToDB(this.state.message)}>
                        ADD
                    </button>
                </div>
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ idToDelete: e.target.value })}
                        placeholder="put id of item to delete here"
                    />
                    <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                        DELETE
                    </button>
                </div>
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ idToUpdate: e.target.value })}
                        placeholder="id of item to update here"
                    />
                    <input
                        type="text"
                        style={{ width: "200px" }}
                        onChange={e => this.setState({ updateToApply: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                          UPDATE
                    </button>
                </div>
            </div>
        );
    }
}

export default MessageHistory;
