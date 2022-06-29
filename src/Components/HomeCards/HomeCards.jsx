import './HomeCards.css'
import candidat from '../../Assets/candidat.png';

function HomeCards({candidate}) {
    return (
        <div class="CardContainer">
            <div class="PictureContainer">
                <img src={candidate.profilePicture}  class="CardPicture"  alt="Jean Lassalle le bg" />
            </div>
            <div class="CardTitle">{candidate.firstname} {candidate.lastname}</div>
            <div class="CardExplain">{candidate.program}</div>
        </div>
    );
}

export default HomeCards;
