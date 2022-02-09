import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;


const Navbar = (props) => {
  return (
    <>
        {props.user ? (
<Header className="bcn">
      <Menu className="bcn" className="navs" theme="dark" mode="horizontal"defaultSelectedKeys={['1']}>
      <Menu.Item key="3" className="authLink">
              <Link to={PATHS.HOMEPAGE} className="link-style">
             Home
            </Link>
              </Menu.Item>
      <SubMenu className="subM"  key="sub1" title="Clientes">
            <Menu.Item   key="1">
              <Link className="link-style" to={PATHS.NEWCUSTUMER} >
              Nuevo cliente
              </Link>
              </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2"title="Materias primas">
            <Menu.Item key="2" >
            <Link to={PATHS.NEWMP} className="link-style">
              Nueva MP
            </Link>
              </Menu.Item>
              <Menu.Item key="3" className="authLink">
              <Link to={PATHS.SEEALLMP} className="link-style">
             Lista de Materias Primas
            </Link>
              </Menu.Item>
          </SubMenu>


          <SubMenu key="sub3"title="Productos">
            <Menu.Item key="4" className="authLink">
            <Link to={PATHS.NEWPRODUCT} className="link-style">
              Nuevo Producto
            </Link>
              </Menu.Item>
              <Menu.Item key="5" className="authLink">
              <Link to={PATHS.SEEALLPRODUCTS} className="link-style">
              Lista de Productos
            </Link>
              </Menu.Item>
          </SubMenu>


          <SubMenu key="sub4"title="Empaques">
            <Menu.Item key="6" className="authLink">
            <Link className="btn-nav" to={PATHS.NEWPACKAGE}className="link-style">
              Nuevo Empaque
            </Link>
              </Menu.Item>
              <Menu.Item key="7" className="authLink">
              <Link to={PATHS.SEEALLPACKAGES} className="link-style">
             Lista de Empaques
            </Link>
              </Menu.Item>
          </SubMenu>

          <SubMenu key="sub5"title="Ordenes">
            <Menu.Item key="8" className="authLink">
            <Link to={PATHS.NEWORDER} className="link-style">
              Nueva Orden
            </Link>
              </Menu.Item>
              <Menu.Item key="9" className="authLink">
              <Link to={PATHS.SEEALLORDERS} className="link-style">
              Lista de Ordenes
            </Link>
              </Menu.Item>
          </SubMenu>

          <SubMenu key="sub6"title="Embarques">
            <Menu.Item key="10" className="authLink">
            <Link to={PATHS.SEECALENDAR} className="link-style">
            Calendario de Rutas
          </Link> 
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="100" className="authLink">
          <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
            </Menu.Item>
      </Menu>
      </Header>

        ) : (
            <Header className="bcn">
          <Menu className="bcn" className="navs" theme="dark" mode="horizontal" >
          <Menu.Item key="99" className="authLink">
          <Link to={PATHS.SIGNUPPAGE} className="link-style">
              Signup
            </Link>
            </Menu.Item>
            <Menu.Item key="98" className="authLink">
            <Link to={PATHS.LOGINPAGE} className="link-style">
              Log In
            </Link>
            </Menu.Item>
      </Menu>
            </Header>

        )}

    </>
  );
};

export default Navbar;
