import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import './PopUpVote.css'
import {Link} from "react-router-dom";
import logo_OV from '../../Assets/logo.png';


const PopUpVote = () => {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState("");

    const closeModal = () => setOpen(false);

    function checkUserInput(){
        if(userInput === 'Je valide'){
            return true;
        }else{
            return false
        }
    }

    return (
        <div>
            <button type="button" className="ButtonVoteConfirm" onClick={() => setOpen(o => !o)}>
                Valider
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <div class="intro">
                        <img src={logo_OV} alt="logo onlyvote" class="LogoPopup"/>
                        <div class="TitrePopup">Vous avez sélectionné Nom Candidat</div>
                    </div>
                    <div>
                        <form className="formpopup">
                            <label>
                                Pour confirmer votre choix, écrire "Je valide" ci-dessous
                                <input type="text" name="validation" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                            </label>
                        </form>
                    </div>

                    <button type="button" className="ButtonChanger" onClick={closeModal}>Changer</button>

                    <button type="button" disabled={userInput !== "Je valide"} onClick={(e) => {
                        e.preventDefault()
                        console.log(userInput)
                    }} class="ButtonVoteValider">
                        Valider
                    </button>

                </div>
            </Popup>
        </div>
    );
}
export default PopUpVote;
