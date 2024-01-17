// Example using React Router
import React, { useEffect,useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from "../../App";

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  const context = useContext(AppContext);

  useEffect(() => {

    const params = new URLSearchParams(location.hash.substring(1));
    const token = params.get('access_token');

    const decodeIdToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  
        return JSON.parse(jsonPayload);
    };

    const decodedToken = decodeIdToken(token);
    context.setToken(decodedToken)
    localStorage.setItem('jwtToken', token);

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
