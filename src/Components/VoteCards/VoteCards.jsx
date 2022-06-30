import './VoteCards.css'

function VoteCards({candidate}) {

    return (

        <div class="VoteCardContainer">
            <div class="PictureContainer">
                <img src={candidate.profilePicture} alt="Candidat 1 photo" class="CardPictureVote"/>
            </div>
            <div className="CardTitle">{candidate.firstname} {candidate.lastname}</div>
            <div class="CardExplain">{candidate.program}</div>
            <div class="Checkbox"><input type="checkbox" /></div>
        </div>
    );
};

export default VoteCards;
