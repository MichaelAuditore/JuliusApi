import "./App.css";
import Container from "react-bootstrap/Container";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

function App() {
  return (
    <HashRouter>
      <Container fluid className="full-width">
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Container>
    </HashRouter>
  );
}

export default App;
