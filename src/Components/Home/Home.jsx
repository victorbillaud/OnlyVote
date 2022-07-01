import HomeCards from "../HomeCards/HomeCards";
import './Home.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useEffect, useState} from "react";




function Home() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1500},
            items: 2
        },
        tablet: {
            breakpoint: {max: 1500, min: 900},
            items: 2
        },
        mobile: {
            breakpoint: {max: 900, min: 0},
            items: 1
        }
    }
    const [candidates, setCandidates] = useState(undefined);

    useEffect(() => {
        loadCandidateFromAPI()
    }, []);


    async function loadCandidateFromAPI(){
        const res = axios({
            method: 'get',
            url:"https://onlyvote.victorbillaud.fr/candidat",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            setCandidates(data.data);
        });
    }

    return (

            <div class="CarouselContainer">
                <Carousel responsive={responsive}>
                    {candidates
                        ? candidates.map((candidate) => {
                            return <HomeCards candidate={candidate}/>
                        }) : <div>SERVEUR DECONNECTE</div>}
                </Carousel >
            </div>
    )
  }

  export default Home;
