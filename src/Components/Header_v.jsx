import logo_OV from '../Assets/logo.png';
import {Link} from "react-router-dom";
import Header from "./Header";

function Header_v(){
    return(
        <div className="header">
            <header className="App-header">
                <img src={logo_OV} className="logo" alt="logo_OnlyVote"/>
            </header>
        </div>
    )
}

export default Header_v;