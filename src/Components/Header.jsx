import logo_OV from '../Assets/logo.png';
import {Link, useLocation} from "react-router-dom";


function Header(){
    const location = useLocation();
    return (
        <div className="header">
            <header className="App-header">
                <Link to="/" class="logo" alt="logo_OnlyVote" >
                    <img src={logo_OV} class="logo" alt="logo_OnlyVote" />
                </Link>
                {
                    location.pathname === "/" ? 
                    <Link to="/vote" class="button_vote">
                        Voter
                    </Link> : null
                    
                }
                {
                    location.pathname === "/vote" ? 
                    <Link to="/form" class="button_vote">
                        S'enregistrer
                    </Link> : null
                    
                }
                {
                    location.pathname === "/form" ? 
                    <Link to="/vote" class="button_vote">
                    Voter
                    </Link> : null
                    
                }
            </header>
        </div>
    );
}

export default Header;