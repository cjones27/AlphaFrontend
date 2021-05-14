import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
// import Logo from 'assets/images/cloudcar-logo.svg';
// import logout from 'utils/logoutUser';
import styles from './NavBar.module.scss';
import { MenuOutlined } from '@ant-design/icons';

const NavBar = () => {
  const { Header } = Layout;
  const logged = false;
  const mobileWidth = false;

  const dropwdownMenu = () => (
    <Menu>
      <Menu.Item>
        {logged ? (
          <Link to="/">
            <span onClick={{}}>Cerrar sesión</span>
          </Link>
        ) : (
          <Link to="/login">
            <span>Iniciar sesión</span>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );

  const navbarItems = () => (
    <>
      {logged ? (
        <>
          <Link to="/">
            <span onClick={{}}>Cerrar sesión</span>
          </Link>
        </>
      ) : (
        <>
          <div className={styles.NavItem}>
            <Link to="/signup">
              <span>Registrarse</span>
            </Link>
          </div>
          <div className={styles.NavItem}>
            <Link to="/login">
              <span>Iniciar sesión</span>
            </Link>
          </div>
        </>
      )}
    </>
  );

  return (
    <Header className={styles.Container}>
      <Link to="/">
        <p> Alpha Solutions </p>
      </Link>
      <div className={styles.NavItems}>
        {!mobileWidth ? (
          navbarItems()
        ) : (
          <Dropdown.Button overlay={dropwdownMenu()} icon={<MenuOutlined />} />
        )}
      </div>
    </Header>
  );
};

export default NavBar;
