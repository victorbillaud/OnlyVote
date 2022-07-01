import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import './PopUpVote.css'
import {Link} from "react-router-dom";
import logo_OV from '../../Assets/logo.png';
import Registered from '../Registred/Registred';


const PopUpVote = ({userSelect}) => {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [userHaveSelect, setUserHaveSelect] = useState(false);
    const [userHaveVoted, setUserHaveVoted] = useState(false);

    const closeModal = () => {
        setOpen(false)
        setUserHaveSelect(false)
        setUserInput("")
        setUserHaveVoted(false)
    };

    const changeVote = () => {
        setOpen(false)
        setUserHaveSelect(false)
        setUserInput("")
    }

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
            {!userHaveVoted ? 
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                {!userHaveSelect ? 
                <div className="modal">
                    <div class="intro">
                        <img src={logo_OV} alt="logo onlyvote" class="LogoPopup"/>
                        <div class="TitrePopup">Vous avez sélectionné <span>{userSelect?.firstname} {userSelect?.lastname}</span></div>
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
                        setUserHaveSelect(true)
                    }} class="ButtonVoteValider">
                        Valider
                    </button> 
                </div> : 
                <div className="modal">
                    <Registered candidate={userSelect} cancel={changeVote} voted={setUserHaveVoted}/>
                </div>
                }
            </Popup> : 
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <div class="intro">
                        <div class="TitrePopup">Félicitations, Votre vote à bien été enregistré </div>
                    </div>
                </div>
            </Popup>
            }
        </div>
    );
}
export default PopUpVote;
