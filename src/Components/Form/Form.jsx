import { Link } from 'react-router-dom';
import './Form.css'


function Form() {
    return (
        <div>
            <Link to="/">
            Things
            </Link>
            <h1 class="title_form" >Veuillez rentrer vos informations pour passer au vote</h1>

            <form class="form_t">
                <div class="taille_nom_d">
                <label class="test">
                    Nom :
                    <input c type="text" name="Nom" />
                </label>
                <br/>
                <label class="test">
                    Prénom :
                    <input type="text" name="Prénom" />
                </label>
                <br/>
                <label class="test">
                    Date de naissance (JJ/MM/AAAA) :
                    <input type="date" name="Date" />
                </label >
                <br/>
                <label class="test">
                    Département naissance (99 si étranger):
                    <input type="text" name ="Département" />
                </label>
                <br/>
                <label>
                    Commune de naissance :
                    <input type="text" name="Commune"/>
                </label>
                <br/>
                </div>

                <label>
                    Numéro de sécurité social :
                    <input type="text" name="Numéro sécurité social"/>
                </label>
                <br/>
                <label>
                    Adresse mail :
                    <input type="email" name="Adresse mail"/>
                </label>
                <br/>
                <label>
                    Numéro de téléphone :
                    <input type="tel" name="Numéro de téléphone"/>
                </label>
                <br/>
                <div>
                Sexe :
                <label>
                    <input type="radio" id="Femme" name="Femme" />
                        <label for="Femme">Femme</label>
                </label>
                <label>
                    <input type="radio" id="Homme" name="Homme"/>
                    <label for="Homme">Homme</label>
                </label>
                </div>

                    <input class="button_form" type="submit" value="Voter" />

                </form>
        </div>
    );
}

export default Form;