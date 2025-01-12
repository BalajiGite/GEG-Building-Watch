import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Building from "./pages/building/Building";
import Meter from "./pages/Meter";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "devextreme/dist/css/dx.light.css";
import Config from "./pages/Config";
import Alert from "./pages/Alert";
import BuildingPerformance from "./pages/BuildingPerformance";
import React, { useState } from "react";
import Report from "./pages/report/Report";

export const AppContext = React.createContext();
function App() {
  const [logoUrl, setLogoUrl] = useState(
    require("../src/assets/images/buildlogo.jpg")
  );

  const [sidenavColor, setSidenavColor] = useState("#1C88B2");
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  // console.log("ppppp", process.env);

  return (
    <>
      {" "}
      <AppContext.Provider
        value={{
          logoUrl,
          setLogoUrl,
          sidenavColor,
          setSidenavColor,
          backgroundColor,
          setBackgroundColor,
        }}
      >
        <div className="App">
          <Switch>
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Main>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/sites" component={Sites} />
              <Route exact path="/building" component={Building} />
              <Route
                exact
                path="/buildingPerformance"
                component={BuildingPerformance}
              />
              <Route exact path="/meter" component={Meter} />
              <Route exact path="/alert" component={Alert} />
              <Route exact path="/config" component={Config} />
              <Route exact path="/report" component={Report} />
              <Redirect from="*" to="/dashboard" />
            </Main>
          </Switch>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
