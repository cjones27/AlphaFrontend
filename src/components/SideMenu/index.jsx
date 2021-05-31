import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideMenu.module.scss';
import { useReactiveVar } from '@apollo/client';
import { isAdmin } from '../../apollo/cache';

const SideMenu = () => {
  const { Sider } = Layout;
  const { pathname } = useLocation();
  const [selectedOption, setSelectedOption] = useState(pathname);
  const isUserSuperAdmin = useReactiveVar(isAdmin);

  const adminNavegationOptions = [
    {
      path: '/properties',
      name: 'Propiedades',
    },
    {
      path: '/appointments',
      name: 'Reservas',
    },
    {
      path: '/users',
      name: 'Usuarios',
    },
    {
      path: '/information',
      name: 'Estadisticas',
    },
  ];

  const userNavegationOptions = [
    {
      path: '/properties',
      name: 'Tus propiedades',
    },
    {
      path: '/appointments',
      name: 'Tus reservas',
    },
    {
      path: '/messages',
      name: 'Mensajes',
    },
  ];

  return (
    <Sider className={styles.SideMenuContainer}>
      <Menu
        mode="inline"
        selectedKeys={[selectedOption]}
        defaultSelectedKeys={[pathname]}
      >
        {isUserSuperAdmin
          ? adminNavegationOptions.map((route) => (
              <Menu.Item onClick={() => setSelectedOption(route.path)} key={route.path}>
                <Link to={route.path}>
                  <span>{route.name}</span>
                </Link>
              </Menu.Item>
            ))
          : userNavegationOptions.map((route) => (
              <Menu.Item onClick={() => setSelectedOption(route.path)} key={route.path}>
                <Link to={route.path}>
                  <span>{route.name}</span>
                </Link>
              </Menu.Item>
            ))}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
