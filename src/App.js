import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Meter from "./pages/Meter";
import Point from "./pages/Point";
import Projects from "./pages/projects/projects";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "devextreme/dist/css/dx.light.css";
import Config from "./pages/GeoConfigs";
import Alert from "./pages/Alert";
import Targets from "./pages/Targets";
import PointsReadings from "./pages/PointsReadings";
import BuildingPerformance from "./pages/BuildingPerformance";
import React, { useState } from "react";
import Report from "./pages/report/Report";

export const AppContext = React.createContext();
function App() {
  const [logoUrl, setLogoUrl] = useState(
    require("../src/assets/images/verdeos_logo.png")
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
              <Route exact path="/projects" component={Projects} />
              <Route
                exact
                path="/buildingPerformance"
                component={BuildingPerformance}
              />
              <Route exact path="/meter" component={Meter} />
              <Route exact path="/point" component={Point} />
              <Route exact path="/alert" component={Alert} />
              <Route exact path="/GeoConfigs" component={Config} />
              <Route exact path="/targets" component={Targets}/>
              <Route exact path="/pointsReadings" component={PointsReadings}/>
              <Route exact path="/report" component={Report} />
              <Redirect from="*" to="/sites" />
            </Main>
          </Switch>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
