// Example using React Router
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Extract tokens or authorization code from the URL parameters
    const params = new URLSearchParams(location.hash.substring(1)); // Remove the '#' from the hash
    const token = params.get('access_token');

    const decodeIdToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  
        return JSON.parse(jsonPayload);
    };

    const decodedToken = decodeIdToken(token);
    // Log the decoded token (contains user details)
    console.log('Decoded id_token:', decodedToken)
    console.log('Decoded id_token:', token)

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
