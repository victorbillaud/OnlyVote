import './VoteCards.css'
import candidat from '../../Assets/candidat.png';

function VoteCards() {

    return (

        <div class="VoteCardContainer">
            <img src={candidat} alt="Candidat 1 photo" class="CardPicture" width="150px" height="150px"/>
            <div className="CardTitle">Candidat 1</div>
            <div class="CardExplain">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div class="Checkbox"><input type="checkbox" /></div>
        </div>
    );
};

export default VoteCards;
