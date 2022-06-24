import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import Vote from './Components/Vote/Vote.jsx'
import Header from "./Components/Header";
import Registred from "./Components/Registred/Registred";
import Form from "./Components/Form/Form";
import Footer from "./Footer";
import Header_v from "./Components/Header_v";
import { useLocation } from "react-router-dom"
import {Component} from "react";
import Compare_header from "./Compare_header";


/*

CE FICHIER NE DOIT CONTENIR QUE LES ROUTES DE SITE

-> Une route = une navigation, c'est comme si en php tu redirigeais vers une autre page mais ici c'est dynamique

Exemple de App avec des routes :

return (
      <div className="App">
          <div className="wrapper">
              <BrowserRouter>
                  <Header />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/register" element={<Register />} />
                  </Routes>
                  <Footer />
                  <Chat />
              </BrowserRouter>
          </div>
      </div>
)

Chaque balises incluent dans l'attribut element de la balise Route (<Home />) sont des composants crées par vous !
-> Dans ce cas la c'est une page entiere

Les Balises Header, Footer et Chat sont des balises creés par vous aussi, elles seront accessibles n'importes ou dans le site.
Cette architecture permet d'avoir un menu de navigation facile et efficace

          const sampleLocation = useLocation();
          <Route path="/" component={App}></Route>
*/

function App(){
  return (
    <div className="App">
      <BrowserRouter>

        <Compare_header />

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/form" element={<Form />} />
              <Route path="/Registred" element={<Registred />} />
          </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}

function App_Form(){
    return(
        <div className="App">
            <BrowserRouter>
            <Header_v />
                <Routes>
                    <Route path="/form" element={<Form />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
