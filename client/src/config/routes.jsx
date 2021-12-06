import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import MapContainer from "../pages/routes"
import Custumer from "../pages/ CustomerRegistration"
//import ProtectedPage from "../pages/ProtectedPage";
import * as PATHS from "../utils/paths";
import React from 'react'


const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.NEWCUSTUMER,
      element: <Custumer {...props} />,
    },   
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <MapContainer {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },  
  //  {
  //    path: PATHS.MAPS,
    //  element: <MapContainer {...props} />,
   // },
    
  ];
};

export default routes;
