import "./Registred.css";
import { Link } from 'react-router-dom';

function Registred(){
    return(
        <div class="container">
        <h1 class="title_registred">Veuillez rentrer vos informations pour passer au vote</h1>
            <label>
                Numéro de téléphone
                <input class="input_r" type="tel" name="Numéro de téléphone"/>
            </label>

            <button class="button_conf">
                Envoyer code de confirmation test
            </button>


            <label>
                Saisir le code
                <input class="input_r" type="text" maxlength="6" name="Code de Vérification"/>
            </label>

            <Link to="/" class="button_validation">
                Valider
            </Link>
        </div>
    )
};

export default Registred;