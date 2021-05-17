import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
// import Logo from 'assets/images/cloudcar-logo.svg';
// import logout from 'utils/logoutUser';
import styles from './NavBar.module.scss';
import { MenuOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { SessionContext } from '../../context/session';

const NavBar = () => {
  const history = useHistory();
  const { Header } = Layout;
  const mobileWidth = false;
  const { logged } = useContext(SessionContext);

  const logout = () => {
    localStorage.setItem('logged', false);
    history.push('login');
  }

  const dropwdownMenu = () => (
    <Menu>
      <Menu.Item>
        {logged ? (
          <Link to="/">
            <span onClick={logout}>Cerrar sesión</span>
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
