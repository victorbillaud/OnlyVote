import { Link } from 'react-router-dom';
import './Form.css'


function Form() {
    return (
        <div class="container">

            <h1 class="title_form" >Veuillez rentrer vos informations pour passer au vote</h1>

            <form class="form_1">
                <label>
                    Nom
                    <input type="text" name="Nom" />
                </label>
                <br/>

                <label>
                    Prénom
                    <input  type="text" name="Prénom" />
                </label>
                <br/>

                <label>
                    Date de naissance (JJ/MM/AAAA)
                    <input  type="text" name="Date" />
                </label >
                <br/>

                <label>
                    Département naissance
                    <input  type="text" name ="Département" />
                </label>
                <br/>

                <label>
                    Commune de naissance
                    <input type="text" name="Commune"/>
                </label>
                <br/>

                <label>
                    Numéro de sécurité social
                    <input type="text" name="Numéro sécurité social"/>
                </label>
                <br/>

                <label>
                    Adresse mail
                    <input type="email" name="Adresse mail"/>
                </label>
                <br/>

                <label>
                    Numéro de téléphone
                    <input type="tel" name="Numéro de téléphone"/>
                </label>
                <br/>

                Sexe :
                <br/>

                <div class="sexe_container">

                    <div class="s_choice">
                        <label htmlFor="Sexe">Femme</label>
                        <input type="radio" id="Femme" name="Sexe"/>
                    </div>

                    <div class="s_choice">
                        <label  htmlFor="Sexe">Homme</label>
                        <input type="radio" id="Homme" name="Sexe"/>
                    </div>
                </div>

                <Link to="/vote" class="button_form">
                    Voter
                </Link>
                </form>

        </div>
    );
}

export default Form;