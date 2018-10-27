import React, { Component } from 'react';
import '../App.css';
import { Navbar } from "../components/Navbar";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Navbar>
                Christophorus Print Manager
            </Navbar>
            <div className={"container-fluid"}>

            </div>
        </div>
    );
  }
}

export default App;
