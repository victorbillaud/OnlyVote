import "./Registred.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

function Registered({ candidate, cancel, voted }) {

    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState(null);

    const [codeSend, setCodeSend] = useState(false);

    const sendCode = () => {
        axios
            .get("https://onlyvote.victorbillaud.fr/code", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'phone' : phone
                },
            })
            .then((res) => {
                if(res.data.result === true){
                    setCodeSend(true);
                }else setMessage(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const checkCode = () => {
        axios
            .get("https://onlyvote.victorbillaud.fr/check", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'phone' : phone,
                    'code' : code,
                    'idCandidate' : candidate.id
                },
            })
            .then((res) => {
                if(res.data.result === true){
                    voted(true);
                }else setMessage(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return(
        !codeSend ? 
        <div class="container">
            <h1 class="title_registred">Votre choix est <span>{candidate.firstname} {candidate.lastname}</span></h1>

            <button class="button_change_vote" onClick={cancel}>
                Changer mon vote
            </button>

            <div>
            Avant de valider votre vote nous avons besoin de vérifier votre identité, pour ce faire un code de vérification va être envoyé sur votre téléphone.
            </div>

            <label>
                <div className="label_phone">Merci de reseigner le numéro de téléphone ci-dessous</div>
                <div className="console_message">{message}</div>
                <input class="input_r" type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}} name="Numéro de téléphone"/>
            </label>

            <button class="button_conf" onClick={sendCode}>
                Envoyer le code
            </button>
        </div> :
        <div class="container">
            <h1 class="title_registred">Veuillez entrer le code a 6 chiffres que vous avez reçu par SMS au {phone}</h1>

            <label>
                <div className="console_message">{message}</div>
                <input class="input_r" type="tel" value={code} onChange={(e)=>{setCode(e.target.value)}} name="Numéro de téléphone"/>
            </label>

            <button class="button_change_vote" onClick={cancel}>
                Changer mon vote
            </button>

            <div>Attention votre vote est définitif</div>

            

            <button class="button_conf" onClick={checkCode}>
                Valider mon vote
            </button>
        </div>
    )
};

export default Registered;