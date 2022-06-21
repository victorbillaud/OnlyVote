import { Link } from 'react-router-dom';
import './Form.css'


function Form() {
    return (
        <div>
            <Link to="/">
            Things
            </Link>
            <h1 class="title_form" >Veuillez rentrer vos informations pour passer au vote</h1>


            <div className="form_1">
            <form>
                <label>
                    Nom
                    <input type="text" name="Nom" />
                </label>
                <br/>

                <label >
                    Prénom
                    <input  type="text" name="Prénom" />
                </label>
                <br/>

                <label >
                    Date de naissance (JJ/MM/AAAA)
                    <input  type="date" name="Date" />
                </label >
                <br/>

                <label>
                    Département naissance
                    <input  type="text" name ="Département" />
                </label>
                <br/>


                <label >
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
                    Adresse mail
                    <input type="email" name="Adresse mail"/>
                </label>
                <br/>

                <label>
                    Numéro de téléphone
                    <input type="tel" name="Numéro de téléphone"/>
                </label>
                <br/>

                <label>
                    Sexe :
                    <br/>
                    <input type="radio" id="Femme" name="Sexe" />
                        <label for="Sexe">Femme</label>
                </label>
                <label>
                    <input type="radio" id="Homme" name="Sexe"/>
                    <label for="Sexe">Homme</label>
                    <br/>

                </label>
                </form>
            </div>
        </div>
    );
}

export default Form;