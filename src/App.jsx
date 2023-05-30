import React from "react";
import './App.css';
import Nevbar from './Nevbar';
import connectContract1 from "./connectContract";
import connectContract2 from "./connectContract2";
import Routes from './Routes';
const App = () => {
    connectContract1();
    connectContract2();
    

    return (
        <React.Fragment>
            <Nevbar />
            <Routes/>
        </React.Fragment>
    );
}
export default App;