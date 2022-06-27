import Header_v from "./Components/Header_v";
import Header from "./Components/Header";
import { useLocation } from "react-router-dom"
import {Component} from "react";


this.state = undefined;

function Compare_header(){
    const Location = window.location.href;
    this.state = undefined;
    this.state.Location = window.location.href;
    return
    {
        if (this.state.Location === "http://localhost:3000/") {
            return <Header_v/>;
        } else {
            return <Header/>;
        }
    };
}

export default Compare_header;