import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../App.css';
import { Navbar } from "../components/Navbar";

class App extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: localStorage.getItem("token") !== null
        }
    }

  render() {
    return (
        <div className="App">
            <Navbar>
                Christophorus Print Manager
            </Navbar>
            {this.state.loggedIn ?
            <div>
                You are logged in
            </div> :
                <div>
                    You are not logged in!<br/>
                    <Link to={"/"}>Zurück zum Login</Link>
                </div>
            }

        </div>
    );
  }
}

export default App;
