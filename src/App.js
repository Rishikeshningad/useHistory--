import { React, Fragment} from "react";
import { Route, Switch } from "react-router-dom";


import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Forget from "./components/Pages/Forget";
import Welcome from "./components/Mail/Welcome";



function App() {
  return (
    <Fragment>
        <Switch>
          
              <Route path="/signup">
                <SignUp/>
              </Route>
          
              <Route path="*" exact>
                <Login/>
              </Route>

              <Route path="/forget">
                <Forget/>
              </Route>

              <Route path="/welcome">
                <Welcome/>
              </Route>
              
              </Switch>
      
    </Fragment>
  );
}

export default App;
