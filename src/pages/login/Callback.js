// Example using React Router
import React, { useEffect,useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from "../../App";
import { Header } from "../../components/layout/Header"

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  const context = useContext(AppContext);

  useEffect(() => {

    const params = new URLSearchParams(location.hash.substring(1));
    const token = params.get('id_token');
    localStorage.setItem('jwtToken', token);
    context.setToken(token);
    history.push('/sites');
  }, [location, history]);

  return (
    <div>
      <h1>Callback Page</h1>
      {/* You can add loading indicators or messages here */}
    </div>
  );
};

export default Callback;
