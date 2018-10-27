import React, { Component } from "react";
import { Navbar } from "../components/Navbar";
import "../App.css"
import { LoginForm } from "../components/Login";
import axios from "axios";
import { BASE_URL, LOGIN } from "../config/constants";

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

    login() {
        console.log("Logging in");
        axios.post(`${BASE_URL}${LOGIN}`, {
            name: this.state.username,
            password: this.state.password
        }).then((result) => {
            localStorage.setItem("token", result.data.data);
            this.setState({username: "", password: ""});
            this.props.history.push("/dashboard");
        }).catch((err) => {
            console.log(err);
        });
    }

    onUserChange(username) {
        this.setState({username: username});
    }

    onPasswordChange(password) {
        this.setState({password: password});
    }

    render() {
        return (
            <div className={"App"}>
                <Navbar>
                    Christophorus Print Manager
                </Navbar>
                <div className={"container-fluid"}>
                    <LoginForm login={this.login.bind(this)} onPasswordChange={this.onPasswordChange.bind(this)}
                               onUserChange={this.onUserChange.bind(this)} password={this.state.password}
                               username={this.state.username}/>
                </div>
            </div>
        );
    }
}
