import { Link } from 'react-router-dom';
import './Vote.css'
import VoteCards from "../VoteCards/VoteCards";

function Vote() {
    return (
        <div>

            <div class="VoteIntro">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>

            <VoteCards/>
            <VoteCards/>
            <VoteCards/>
            <VoteCards/>

        </div>




    );
  }
  
  export default Vote;