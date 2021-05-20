import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {BackendPage} from "./pages/BackendPage";
import {LocalPage} from "./pages/LocalPage"
import {Navbar} from "./components/Navbar";
import {Alerts} from "./components/Alerts";
import {AlertState} from "./context/alert/AlertState";
import {FirebaseState} from "./context/firebase/FirebaseState";

function App() {
  return (
      <FirebaseState>
          <AlertState>
              <BrowserRouter>
                  <Navbar />
                  <Alerts />
                  <Switch>
                      <Route path={'/'} exact component={BackendPage} />
                      <Route path={'/local'} exact component={LocalPage} />
                      <div className="container">

                      </div>
                  </Switch>
              </BrowserRouter>
          </AlertState>
      </FirebaseState>
  );
}

export default App;
