import './VoteCards.css'

function VoteCards({candidate}) {

    return (

        
        <div  class="VoteCardContainer">
            <input type="radio" id={candidate.id} name="vote" value={candidate.id} />
            <label class="LabelVoteCardContainer" for={candidate.id} >
                <div class="PictureContainer">
                    <img src={candidate.profilePicture} alt="Candidat 1 photo" class="CardPictureVote"/>
                </div>
                <div className="CardTitle">{candidate.firstname} {candidate.lastname}</div>
            </label>
        </div>
    );
};

export default VoteCards;
