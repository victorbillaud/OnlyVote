import './HomeCards.css'
import candidat from '../../Assets/candidat.png';

function HomeCards() {
    return (
        <div class="CardContainer">
            <div class="PictureContainer">
                <img src={candidat}  class="CardPicture"  alt="Jean Lassalle le bg" />
            </div>
            <div class="CardTitle">Test container</div>
            <div class="CardExplain">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </div>
        </div>
    );
}

export default HomeCards;
