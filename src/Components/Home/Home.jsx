import HomeCards from "../HomeCards/HomeCards";
import './Home.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




function Home() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1500},
            items: 3
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

    return (

            <div class="CarouselContainer">
                <Carousel responsive={responsive}>
                    <HomeCards/>
                    <HomeCards/>
                    <HomeCards/>
                    <HomeCards/>
                    <HomeCards/>
                    <HomeCards/>

                </Carousel >
            </div>
    )
  }

  export default Home;
