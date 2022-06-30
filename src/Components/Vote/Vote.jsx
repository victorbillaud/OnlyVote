import './Vote.css'
import VoteCards from "../VoteCards/VoteCards";
import PopUpVote from "../PopUpVote/PopUpVote"
import {useEffect, useState} from "react";
import axios from "axios";
import HomeCards from "../HomeCards/HomeCards";



function Vote() {

    const [candidates, setCandidates] = useState(undefined);

    useEffect(() => {
        loadCandidateFromAPI()
    }, []);


    async function loadCandidateFromAPI(){
        const res = axios({
            method: 'get',
            url:"https://onlyvote.victorbillaud.fr/candidat",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            setCandidates(data.data);
        });
    }

    return (
        <div class="VotePage">



            <div class="VoteIntro">
                <h2>Pourquoi faut-il voter ?</h2>
                <p>Voter, ça sert avant tout à choisir ses dirigeants politiques. Il s’agit d’un droit pour les citoyens qui vivent en démocratie… C’est-à-dire dans un État où les libertés fondamentales sont garanties et où le pouvoir est exercé par les représentants du peuple. Les citoyens français, hommes et femmes de 18 ans et plus, ont le droit de voter de façon libre et secrète. Ils élisent, par exemple, le président de la République, qui est le chef de l’État, ainsi que les députés, qui sont ceux qui décident des lois. Ils votent également pour les conseillers municipaux, qui gèrent la ville avec le maire, ou encore pour les conseillers départementaux et régionaux.</p>
            </div>

            <div class="CandidateList">
                {candidates
                    ? candidates.map((candidate) => {
                        return <VoteCards candidate={candidate}/>
                    }) : <div>SERVEUR DECONNECTE</div>}
            </div>



            <PopUpVote/>




        </div>




    );
  }

  export default Vote;
