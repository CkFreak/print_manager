import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import axios from "axios";
import '../App.css';
import { Navbar } from "../components/Navbar";
import { TableHeadRow } from "../components/Table/tableHeadRow";
import { PayButton, Table } from "../components/Table/styles";
import { BASE_URL, CLIENTS, PAY } from "../config/constants";
import { TableDataRow } from "../components/Table/tableDataRow";
import { Logout } from "../components/Navbar/styles";
import { Footer } from "../components/Footer";

class App extends Component {

    constructor() {
        super();
        this.state = {
            token: localStorage.getItem("token"),
            tokenValid: false,
            tableData: [],
        }
    }

    logout() {
        this.setState({token: "", tokenValid: false});
        this.props.history.push("/");
    }

    validateToken() {
        const token = this.state.token;
        let isValid = false;
        try {
            const decode = jwtDecode(token);
            isValid = decode.name && decode.iat < Date.now();
            this.setState({tokenValid: isValid});
            return true;
        } catch (e) {
            console.log("No valid token!");
            return false;
        }
    }

    payForUser(user) {
        axios.put(`${BASE_URL}${PAY}`, {
            name: user,
        }, {headers: {
                jwt: this.state.token
            }
        }).then(() => {
            this.fetchClients();
        }).catch((err) => {
            console.log(err);
        });
    }

    createClientRow(client) {
        return <TableDataRow key={Math.random() * 100} rowData={[client.name, client.jobsTotal, client.pagesTotal, `${client.duePages * 0.05}€`,
            <PayButton key={Math.random() * 150} onClick={() => this.payForUser(client.name)}>Zahlen</PayButton>]}/>
    }

    fetchClients() {
        axios.get(`${BASE_URL}${CLIENTS}`, {headers: {jwt: this.state.token}})
            .then((result) => {
                const resArray = result.data.data;
                const ret = [];
                for (let i = 0; i < resArray.length; ++i) {
                    ret.push(this.createClientRow(resArray[i]));
                }
                this.setState({tableData: ret});
            }).catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        if (this.validateToken()) {
            this.fetchClients();
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar>
                    Christophorus Print Manager
                    <Logout onClick={() => this.logout()}>Logout</Logout>
                </Navbar>
                {this.state.tokenValid ?
                    <div>
                        <Table>
                            <TableHeadRow
                                header={["Benutzername", "Jobs gesamt", "Seiten gesamt", "Zu zahlen", "Zahlen"]}/>
                            {this.state.tableData}
                        </Table>
                        <footer>
                            <Footer/>
                        </footer>
                    </div> :
                    <div>
                        You are not logged in!<br/>
                        <Link to={"/"}>Zurück zum Login</Link>
                        <footer>
                            <Footer/>
                        </footer>
                    </div>
                }

            </div>
        );
    }
}

export default App;
