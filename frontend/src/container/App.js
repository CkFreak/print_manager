import React, { Component } from 'react';
import {Link} from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import '../App.css';
import { Navbar } from "../components/Navbar";

class App extends Component {

    constructor() {
        super();
        this.state = {
            token: localStorage.getItem("token"),
            tokenValid: false,
        }
    }

    componentDidMount() {
        const token = this.state.token;
        let isValid = false;
        try {
            const decode = jwtDecode(token);
            isValid = decode.name && decode.iat < Date.now();
            this.setState({tokenValid: isValid});
        } catch (e) {
            console.log("No valid token!");
        }
    }

  render() {
    return (
        <div className="App">
            <Navbar>
                Christophorus Print Manager
            </Navbar>
            {this.state.tokenValid ?
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
