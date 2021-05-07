import './App.css';
import MoponolyGame from "./Components/MoponolyGame";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Nav from "./Components/Nav/Nav.js";
import HomePage from "./Components/Home/HomePage.js";
import About from "./Components/About/About.js";
import Global from "./Components/Global/Global.js";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/go" component={MoponolyGame} />
        <Route exact path="/about" component={About} />
        <Route exact path="/global" component={Global} />
      </div>
    </Router>
  );
}

export default App;
