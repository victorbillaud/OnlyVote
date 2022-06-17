import './HomeCards.css'
import candidat from '../../Assets/candidat.png';

function HomeCards() {
    return (
        <div class="CardContainer">
            <div class="test">
                <img src={candidat}  class="CardPicture"  alt="Jean Lassalle le bg" width="150px" height="150px" />
            </div>
            <div class="CardTitle">Test container</div>
            <div class="CardExplain">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
        </div>
    );
}

export default HomeCards;
