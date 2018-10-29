import React, { Component } from "react";
import { Navbar } from "../components/Navbar";
import "../App.css"
import { LoginForm } from "../components/Login";
import axios from "axios";
import { BASE_URL, LOGIN } from "../config/constants";
import { Footer } from "../components/Footer";
import { Spinner } from "../components/Spinner";

// Colors for this project where found here: https://color.adobe.com/Color-Theme-3-color-theme-11432376/edit/?copy=true&base=2&rule=Custom&selected=4&name=Copy%20of%20Color%20Theme%203&mode=rgb&rgbvalues=0.0862745,0.278431,0.45098,0.776471,0.85098,0.611765,0.9098039215686274,0.8627450980392157,0.6862745098039216,0.94902,0.8,0.0588235,0.65098,0.196078,0.196078&swatchOrder=0,1,2,3,4

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loading: false,
        };
    }

    login() {
        console.log("Logging in");
        this.setState({loading: true});
        axios.post(`${BASE_URL}${LOGIN}`, {
            name: this.state.username,
            password: this.state.password
        }).then((result) => {
            localStorage.setItem("token", result.data.data);
            this.setState({username: "", password: ""});
            this.props.history.push("/dashboard");
        }).catch((err) => {
            if (err.response) {
                // non 200 response
                console.log(err.response.status);
                this.setState({loading: false});
            }
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
                    {this.state.loading ? <Spinner/> :
                        <LoginForm login={this.login.bind(this)} onPasswordChange={this.onPasswordChange.bind(this)}
                                   onUserChange={this.onUserChange.bind(this)} password={this.state.password}
                                   username={this.state.username}/>
                    }
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>
        );
    }
}
