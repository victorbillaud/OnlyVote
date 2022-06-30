import './HomeCards.css'

function HomeCards({candidate}) {
    return (
        <div class="CardContainer">
            <div class="PictureContainerHome">
                <img src={candidate.profilePicture}  class="CardPicture"  alt="Jean Lassalle le bg" />
            </div>
            <div class="CardTitle">{candidate.firstname} {candidate.lastname}</div>
            <div class="CardExplain">{candidate.program}</div>
        </div>
    );
}

export default HomeCards;
