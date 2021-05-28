import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import styles from './NavBar.module.scss';
import { MenuOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { logged, username } from '../../apollo/cache';

const NavBar = () => {
  const history = useHistory();
  const { Header } = Layout;
  const mobileWidth = false;
  const loggedVar = useReactiveVar(logged);
  const usernameVar = useReactiveVar(username);
  const [notifications, setNotifications] = useState(false);
  const [settings, setSettings] = useState(false);

  const logout = () => {
    localStorage.clear();
    logged(false);
    history.push('login');
  };

  const dropwdownMenu = () => (
    <Menu>
      <Menu.Item>
        {loggedVar ? (
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

  const notificationPannel = () => (
    <div className={styles.NotificationDropdown}>
      <p> Notificaciones</p>
      <p> Notificaciones</p>
      <p> Notificaciones</p>
    </div>
  );

  const settingPannel = () => (
    <div className={styles.NotificationDropdown}>
      <Link to="/" className={styles.NavItem}>
        <span onClick={logout}>Cerrar sesión</span>
      </Link>
    </div>
  );

  const navbarItems = () => (
    <>
      {loggedVar ? (
        <>
          <Link to="/" className={styles.NavItem}>
            <span>{usernameVar}</span>
          </Link>
          <MailOutlined
            onClick={() => {
              setNotifications(!notifications);
              setSettings(false);
            }}
            style={{ fontSize: '18px', color: 'white', cursor: 'pointer' }}
            className={styles.NavItem}
          ></MailOutlined>
          <SettingOutlined
            onClick={() => {
              setSettings(!settings);
              setNotifications(false);
            }}
            style={{ fontSize: '18px', color: 'white', cursor: 'pointer' }}
            className={styles.NavItem}
          ></SettingOutlined>
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
      {notifications && notificationPannel()}
      {settings && settingPannel()}
      <div className={styles.NavItems}>
        <div className={styles.TittleItem}>
          <Link to="/">Alpha Solutions</Link>
        </div>
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
