import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import Custumer from "../pages/CustomerRegistration"
import NEWMP from "../pages/MpRguistrer"
import NEWPRODUCT from "../pages/ProductRegistration"
import NEWPACKAGE from "../pages/PackageRegistration"
import NEWORDER from "../pages/OrderRegistration"
import SEEALLORDERS from "../pages/OrdersView"
import SEEALLMP from "../pages/MPView"
import SEEALLPRODUCTS from "../pages/ProductsView"
import SEEALLPACKAGES from "../pages/PackagesView"
import SEEORDERDETAIL from "../pages/OrderDetail"
import SEEPRODUCTDETAIL from "../pages/ProductDetail"
import SEECALENDAR from "../pages/CalendarView"
import NEWROUTE from "../pages/RouteRegistreation"
import SEEROUTEDETAIL from "../pages/RouteDetail"

import * as PATHS from "../utils/paths";
import React from 'react'


const routes = (props) => {
  const { user } = props;
//  console.log(user)
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
      element: user ? (
        <Custumer {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.NEWMP,
      element: user ? (
        <NEWMP {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.NEWPRODUCT,
      element: user ? (
        <NEWPRODUCT {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
  
    {
      path: PATHS.NEWPACKAGE,
      element: user ? (
        <NEWPACKAGE {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    
    {
      path: PATHS.NEWORDER,
      element: user ? (
        <NEWORDER {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.SEEALLORDERS,
      element: user ? (
        <SEEALLORDERS {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.SEEALLMP,
      element: user ? (
        <SEEALLMP {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.SEEALLPRODUCTS,
      element: user ? (
        <SEEALLPRODUCTS {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.SEEALLPACKAGES,
      element: user ? (
        <SEEALLPACKAGES {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }, 
    {
      path: PATHS.SEEORDERDETAIL,
      element: user ? (
        <SEEORDERDETAIL {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.SEEPRODUCTDETAIL,
      element: user ? (
        <SEEPRODUCTDETAIL {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.SEECALENDAR,
      element: user ? (
        <SEECALENDAR {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.NEWROUTE,
      element: user ? (
        <NEWROUTE {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.SEEROUTEDETAIL,
      element: user ? (
        <SEEROUTEDETAIL {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    }    
  ];
};

export default routes;
