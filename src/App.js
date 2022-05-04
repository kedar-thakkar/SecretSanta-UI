import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './component/landing';
import List from "./component/participant/list";
import Shuffle from './component/participant/shuffle';
function App() {
  return (
    <Router>
      <div>
      <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/participants" exact component={List}/>
          <Route path="/shuffle" exact component={Shuffle}/>
        </Switch>
      </div>

    </Router>
    
  );
}

export default App;
