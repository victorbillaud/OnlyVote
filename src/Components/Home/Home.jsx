import { Link } from 'react-router-dom';


function Home() {
    return (
      <div>
        <div class="title">Home Page</div>
        <Link to="/vote">
          Things
        </Link>
      </div>
    );
  }
  
  export default Home;