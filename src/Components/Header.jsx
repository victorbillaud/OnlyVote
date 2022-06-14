import logo_OV from '../Assets/logo.png';

function Header(){
    return (
        <div className="header">
            <header className="App-header">
                <img src={logo_OV} class="logo" alt="logo_OnlyVote" />
                <button class="button_vote">Voter</button>
            </header>
        </div>
    );
}

export default Header;