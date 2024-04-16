import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Meter from "./pages/Meter";
import Point from "./pages/Point";
import Projects from "./pages/projects/projects";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Login from "./pages/login/Login";
import callback from "./pages/login/Callback";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "devextreme/dist/css/dx.light.css";
import Config from "./pages/GeoConfigs";
import Alert from "./pages/Alert";
import Targets from "./pages/Targets";
import PointsReadings from "./pages/PointsReadings";
import Tracker from "./pages/Tracker";
import BuildingPerformance from "./pages/BuildingPerformance";
import Report from "./pages/report/Report";
import UnAuth from './components/layout/UnAuth';
import { validateAuth } from "./services/apis";

export const AppContext = React.createContext();
function App() {
  const [logoUrl, setLogoUrl] = useState(
    require("../src/assets/images/verdeos_logo.png")
  );

  const [sidenavColor, setSidenavColor] = useState("#1C88B2");
  const [backgroundColor, setBackgroundColor] = useState("#0A1016");
  const [token, setToken] = useState({});
  const [refreshToken, setRefreshToken] = useState({});

  const [isPolicyExist, setIsPolicyExist] = useState(() => {
    const storedPolicyExist = localStorage.getItem("isPolicyExist");
    return storedPolicyExist ? storedPolicyExist : false;
  });
  const [isWidgetAccessFilter, setIsWidgetAccessFilter] = useState(() => {
    const storedWidgetAccessFilter = localStorage.getItem("isWidgetAccessFilter");
    return storedWidgetAccessFilter ? storedWidgetAccessFilter : "";
  });

  useEffect(() => {
    localStorage.setItem("isPolicyExist", isPolicyExist);
    localStorage.setItem("isWidgetAccessFilter", isWidgetAccessFilter);
  }, [isPolicyExist, isWidgetAccessFilter]);
  
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
          setToken,
          token,
          refreshToken,
          setRefreshToken,
          isPolicyExist,
          setIsPolicyExist,
          isWidgetAccessFilter,
          setIsWidgetAccessFilter
        }}
      >
        <div className="App">
          <Switch>
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path='/' exact component={Login} />
            <Route path='/UnAuth' exact component={UnAuth} />
            <Route path="/callback" exact component={callback} /> 
            <Main>
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("dashboard")? <Route exact path="/dashboard" component={Home} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("sites") ? <Route exact path="/sites" component={Sites} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("projects") ? <Route exact path="/projects" component={Projects} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("buildingPerformance") ? <Route exact path="/buildingPerformance" component={BuildingPerformance} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("meter") ?<Route exact path="/meter" component={Meter} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("point") ?<Route exact path="/point" component={Point} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("alert") ? <Route exact path="/alert" component={Alert} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("GeoConfigs") ?<Route exact path="/GeoConfigs" component={Config} />:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("targets") ?<Route exact path="/targets" component={Targets}/>:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("meterReadings") ?<Route exact path="/pointsReadings" component={PointsReadings}/>:""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("tracker") ?<Route exact path="/tracker" component={Tracker} /> : ""}
              {isPolicyExist && isWidgetAccessFilter.hasOwnProperty("report") ?<Route exact path="/report" component={Report} /> :""}            
            </Main>
          </Switch>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
