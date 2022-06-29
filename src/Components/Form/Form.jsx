import {Link} from 'react-router-dom';
import Select from "react-select";
import './Form.css'
import {useState} from "react";
import axios from "axios";

function Form() {

    const department = [{
        "dep": 1
    }, {
        "dep": 2
    }, {
        "dep": 3
    }, {
        "dep": 4
    }, {
        "dep": 5
    }, {
        "dep": 6
    }, {
        "dep": 7
    }, {
        "dep": 8
    }, {
        "dep": 9
    }, {
        "dep": 10
    }, {
        "dep": 11
    }, {
        "dep": 12
    }, {
        "dep": 13
    }, {
        "dep": 14
    }, {
        "dep": 15
    }, {
        "dep": 16
    }, {
        "dep": 17
    }, {
        "dep": 18
    }, {
        "dep": 19
    }, {
        "dep": 20
    }, {
        "dep": 21
    }, {
        "dep": 22
    }, {
        "dep": 23
    }, {
        "dep": 24
    }, {
        "dep": 25
    }, {
        "dep": 26
    }, {
        "dep": 27
    }, {
        "dep": 28
    }, {
        "dep": 29
    }, {
        "dep": 30
    }, {
        "dep": 31
    }, {
        "dep": 32
    }, {
        "dep": 33
    }, {
        "dep": 34
    }, {
        "dep": 35
    }, {
        "dep": 36
    }, {
        "dep": 37
    }, {
        "dep": 38
    }, {
        "dep": 39
    }, {
        "dep": 40
    }, {
        "dep": 41
    }, {
        "dep": 42
    }, {
        "dep": 43
    }, {
        "dep": 44
    }, {
        "dep": 45
    }, {
        "dep": 46
    }, {
        "dep": 47
    }, {
        "dep": 48
    }, {
        "dep": 49
    }, {
        "dep": 50
    }, {
        "dep": 51
    }, {
        "dep": 52
    }, {
        "dep": 53
    }, {
        "dep": 54
    }, {
        "dep": 55
    }, {
        "dep": 56
    }, {
        "dep": 57
    }, {
        "dep": 58
    }, {
        "dep": 59
    }, {
        "dep": 60
    }, {
        "dep": 61
    }, {
        "dep": 62
    }, {
        "dep": 63
    }, {
        "dep": 64
    }, {
        "dep": 65
    }, {
        "dep": 66
    }, {
        "dep": 67
    }, {
        "dep": 68
    }, {
        "dep": 69
    }, {
        "dep": 70
    }, {
        "dep": 71
    }, {
        "dep": 72
    }, {
        "dep": 73
    }, {
        "dep": 74
    }, {
        "dep": 75
    }, {
        "dep": 76
    }, {
        "dep": 77
    }, {
        "dep": 78
    }, {
        "dep": 79
    }, {
        "dep": 80
    }, {
        "dep": 81
    }, {
        "dep": 82
    }, {
        "dep": 83
    }, {
        "dep": 84
    }, {
        "dep": 85
    }, {
        "dep": 86
    }, {
        "dep": 87
    }, {
        "dep": 88
    }, {
        "dep": 89
    }, {
        "dep": 90
    }, {
        "dep": 91
    }, {
        "dep": 92
    }, {
        "dep": 93
    }, {
        "dep": 94
    }, {
        "dep": 95
    }, {
        "dep": 96
    }, {
        "dep": 97
    }, {
        "dep": 98
    }, {
        "dep": 99
    }, {
        "dep": 100
    }]


    const [region, setRegion] = useState(department[0]);
    const [currentCountry, setCurrentCountry] = useState(null);
    const onchangeSelect = (item) => {
        setCurrentCountry(null);
        setRegion(item);
        loadTownsFromAPI().then(r => setTowns(r.data))
    };

    const [towns, setTowns] = useState([]);
    const [town, setTown] = useState(towns[0]);
    const [currentTown, setCurrentTown] = useState(null);

    const onChangeTownSelect = (item) => {
        setCurrentTown(null);
        setTown(item);
    };

    async function loadTownsFromAPI(){
        let response;
        return response = await fetchTowns({
            department: region
        });
    }

    function fetchTowns(data) {
        return axios.post("https://onlyvote.victorbillaud.fr/department", {
            data
        })
    }

    return (<div class="container">

            <h1 class="title_form">Veuillez rentrer vos informations pour passer au vote</h1>

            <Link to="/registred">
                <p class="already">J'ai déjà rempli le formulaire</p>
            </Link>

            <form class="form_1">
                <label>
                    Nom
                    <input type="text" name="Nom"/>
                </label>
                <br/>

                <label>
                    Prénom
                    <input type="text" name="Prénom"/>
                </label>
                <br/>

                <label>
                    Date de naissance (JJ/MM/AAAA)
                    <input type="date" name="Date"/>
                </label>
                <br/>

                <label>
                    Département naissance
                    <Select
                        value={region}
                        onChange={onchangeSelect}
                        options={department}
                        getOptionValue={(option) => option.dep}
                        getOptionLabel={(option) => option.dep}
                    />
                </label>
                <br/>

                <label>
                    Commune de naissance
                    <Select
                        value={town}
                        onChange={onChangeTownSelect}
                        options={towns}
                        getOptionValue={(option) => option.nccenr}
                        getOptionLabel={(option) => option.nccenr}
                    />
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
                        <label htmlFor="Sexe">Homme</label>
                        <input type="radio" id="Homme" name="Sexe"/>
                    </div>
                </div>

                <Link to="/vote" class="button_form">
                    Voter
                </Link>
            </form>

        </div>);
}

export default Form;