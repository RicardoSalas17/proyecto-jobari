import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomePageInfo from "../pages/infoPages/HomeInfo"
//AUTH
import Login from "../pages/auth/LogIn";
import Signup from "../pages/auth/Signup";
//CUSTUMER
import NEWCUSTMER from "../pages/custumer/CustomerRegistration"
import SEEALLCUSTUMER from "../pages/custumer/CustomerView"
import SEECUSTUMERDETAIL from "../pages/custumer/CustumerDetail"
//MP
import NEWMP from "../pages/MP/MpRegistration"
import SEEALLMP from "../pages/MP/MpView"
import SEEMPDETAIL from "../pages/MP/MpDetail"
//PRODUCT
import NEWPRODUCT from "../pages/product/ProductRegistration"
import SEEALLPRODUCTS from "../pages/product/ProductsView"
import SEEPRODUCTDETAIL from "../pages/product/ProductDetail"
//PACKAGES
import NEWPACKAGE from "../pages/PackageRegistration"
import SEEALLPACKAGES from "../pages/PackagesView"
//ORDERS
import NEWORDER from "../pages/orders/OrderRegistration"
import SEEALLORDERS from "../pages/orders/OrdersView"
import SEEORDERDETAIL from "../pages/orders/OrderDetail"
//ROUTES
import NEWROUTE from "../pages/RouteRegistreation"
import SEECALENDAR from "../pages/CalendarView"
import SEEROUTEDETAIL from "../pages/RouteDetail"

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
      path: PATHS.HomePageInfo,
      element: <HomePageInfo {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: !user ? (
        <Signup {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      ),
    },

    {
      path: PATHS.LOGINPAGE,
      element: !user ? (
        <Login {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      )
    },
    {
      path: PATHS.NEWCUSTUMER,
      element: user ? (
        <NEWCUSTMER {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.SEEALLCUSTUMER,
      element: user ? (
        <SEEALLCUSTUMER {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      )
    },
    {
      path: PATHS.SEECUSTUMERDETAIL,
      element: user ? (
        <SEECUSTUMERDETAIL {...props} />
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
    },     {
      path: PATHS.SEEMPDETAIL,
      element: user ? (
        <SEEMPDETAIL {...props} />
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
