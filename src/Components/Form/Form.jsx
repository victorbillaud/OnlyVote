import { Link } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Select, { Option } from "rc-select";

import department from "./department.json";

function Form() {
    // FORM VAR

    const [town, setTown] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [dob, setDob] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [socialSecurityNumber, setSocialSecurityNumber] = useState();

    const [returnMessage, setReturnMessage] = useState();

    const [departments, setDepartments] = useState([]);
    const [region, setRegion] = useState(1);

    const onChangeSelect = (item) => {
        item.preventDefault()
        setRegion(parseInt(item.target.value));
        setTowns([]);
        loadTownsFromAPI(parseInt(item.target.value)).then((r) => {
            setTowns(r.data);
        });
    };

    const onChangeTownSelect = (item) => {
        item.preventDefault()
        setTown(item.target.value);
    };

    const [towns, setTowns] = useState([]);

    async function loadTownsFromAPI(dep) {
        return await fetchTowns({
            department: dep,
        });
    }

    function fetchTowns(data) {
        return axios.post("https://onlyvote.victorbillaud.fr/department", {
            data,
        });
    }

    function sendRegister(data) {
        return axios.post("https://onlyvote.victorbillaud.fr/register", {
            data
        });
    }

    async function register() {
        setReturnMessage("");
        const response = await sendRegister({
            gender: gender,
            phoneNumber: phone,
            email: email,
            birthDate: new Date(dob).getTime()/1000,
            lastname: lastname,
            firstname: firstname,
            birthTown: town,
            socialNumber: socialSecurityNumber,
            birthDepartment: parseInt(region),
        });
        setReturnMessage(response.data.message);
    }

    useEffect(() => {
        setDepartments(department);
        loadTownsFromAPI(1).then((r) => {
            setTowns(r.data);
            console.log(r.data);
        });
    }, []);

    return (
        <div class="container-register">
            <div class="form">
                <h1 class="title_form">
                    Veuillez rentrer vos informations pour passer au vote
                </h1>
                <label>
                    Nom
                    <input
                        type="text"
                        name="Nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Prénom
                    <input
                        type="text"
                        name="Prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Date de naissance (JJ/MM/AAAA)
                    <input
                        type="date"
                        name="Date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Département naissance
                    <br />
                    <select name="Département" onChange={onChangeSelect}required>
                        {department.map((item, index) => {
                            return (
                                <option key={index} value={item.departement}>
                                    {item.departement}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <br />
                <label>
                    Commune de naissance
                    <br />
                    <select name="Towns" onChange={onChangeTownSelect}required>
                        {towns.map((item, index) => {
                            return (
                                <option key={index} value={item.nccenr}>
                                    {item.nccenr}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <br />
                <label>
                    Numéro de sécurité social
                    <input
                        type="text"
                        name="Numéro sécurité social"
                        value={socialSecurityNumber}
                        onChange={(e) => setSocialSecurityNumber(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Adresse mail
                    <input
                        type="email"
                        name="Adresse mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Numéro de téléphone
                    <input
                        type="tel"
                        name="Numéro de téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </label>
                <br />
                Sexe :
                <br />
                <div class="sexe_container" onChange={(e) => setGender(e.target.value)} required>
                    <label htmlFor="Sexe">Femme</label>
                    <input type="radio" id="Sexe" value={"femme"} name="Sexe" />

                    <label htmlFor="Sexe">Homme</label>
                    <input type="radio" id="Homme" value={"homme"} name="Sexe" />
                </div>
                <label>{returnMessage}</label>
                <button class="button_form" onClick={register}>
                    Voter
                </button>
            </div>
        </div>
    );
}

export default Form;
