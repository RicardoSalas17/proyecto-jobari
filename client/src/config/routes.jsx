import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import MapContainer from "../pages/routes"
import Custumer from "../pages/CustomerRegistration"
import NEWMP from "../pages/MpRguistrer"
import NEWPRODUCT from "../pages/ProductRegistration"
import NEWPACKAGE from "../pages/PackageRegistration"
import NEWORDER from "../pages/OrderRegistration"
import SEEALLORDERS from "../pages/OrdersView"
import SEEALLMP from "../pages/MPView"
import SEEALLPRODUCTS from "../pages/ProductsView"
import SEEALLPACKAGES from "../pages/PackagesView"
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
      path: PATHS.NEWMP,
      element: <NEWMP {...props} />,
    }, 
    {
      path: PATHS.NEWPRODUCT,
      element: <NEWPRODUCT {...props} />,
    }, 
  
    {
      path: PATHS.NEWPACKAGE,
      element: <NEWPACKAGE {...props} />,
    }, 
    
    {
      path: PATHS.NEWORDER,
      element: <NEWORDER {...props} />,
    }, 
    {
      path: PATHS.SEEALLORDERS,
      element: <SEEALLORDERS {...props} />,
    }, 
    {
      path: PATHS.SEEALLMP,
      element: <SEEALLMP {...props} />,
    }, 
    {
      path: PATHS.SEEALLPRODUCTS,
      element: <SEEALLPRODUCTS {...props} />,
    }, 
    {
      path: PATHS.SEEALLPACKAGES,
      element: <SEEALLPACKAGES {...props} />,
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
