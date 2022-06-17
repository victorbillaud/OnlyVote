import { Link } from 'react-router-dom';


function Form() {
    return (
        <div>
            <Link to="/">
            Things
            </Link>
            <h1 class="title_form" >Veuillez rentrer vos informations pour passer au vote</h1>


            <form>
                <label>
                    Nom :
                    <input type="text" name="Nom" />
                </label>
                <label>
                    Prénom :
                    <input type="text" name="Prénom" />
                </label>
                <input type="submit" value="Envoyer" />
            </form>

        </div>
    );
}
/** TEST
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Participe :
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Nombre d'invités :
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}
**/

export default Form;