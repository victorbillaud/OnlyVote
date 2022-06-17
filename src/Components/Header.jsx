import logo_OV from '../Assets/logo.png';
import {Link} from "react-router-dom";

function Header(){
    return (
        <div className="header">
            <header className="App-header">
                <img src={logo_OV} class="logo" alt="logo_OnlyVote" />
                <Link to="/vote" class="button_vote">
                    <p id="header_voter"> Voter</p>
                </Link>
            </header>
        </div>
    );
}

export default Header;