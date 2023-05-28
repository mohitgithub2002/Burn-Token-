import React, { Component } from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./home";
import Container from "./Container";
export default class routes extends Component {
    render() {
        return (
            
            <Routes>
                <Route path="/" element={<Container />} />
                <Route path="/home" element={<Home />} />
            </Routes>
            
        )
    }
}