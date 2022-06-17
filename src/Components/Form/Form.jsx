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
                <div class="form_1">
                <label>
                    Nom :
                    <input class="taille"type="text" name="Nom" />
                </label>
                <br/>
                <label class="taille">
                    Prénom :
                    <input class="taille" type="text" name="Prénom" />
                </label>
                <br/>
                <label class="taille">
                    Date de naissance (JJ/MM/AAAA) :
                    <input class="taille" class="test" type="date" name="Date" />
                </label >
                <br/>
                <label>
                    Département naissance (99 si étranger):
                    <input class="taille" type="text" name ="Département" />
                </label>
                <br/>
                </div>



                <div class="container_2">
                <label   >
                    Commune de naissance
                    <input type="text" name="Commune"/>
                </label>
                <br/>
                <label >
                    Numéro de sécurité social
                    <input type="text" name="Numéro sécurité social"/>
                </label>
                <br/>
                <label >
                    Adresse mail :
                    <input  type="email" name="Adresse mail"/>
                </label>
                <br/>
                <label>
                    Numéro de téléphone :
                    <input type="tel" name="Numéro de téléphone"/>
                </label>
                <br/>
                </div>

                <div>
                Sexe :
                <label>
                    <input type="radio" id="Femme" name="Sexe" />
                        <label for="Sexe">Femme</label>
                </label>
                <label>
                    <input type="radio" id="Homme" name="Sexe"/>
                    <label for="Sexe">Homme</label>
                </label>
                </div>
                    <br/>
                    <input className="button_form" type="submit" value="Voter"/>




                </form>
        </div>
    );
}

export default Form;