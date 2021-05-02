import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideMenu.module.scss';

const SideMenu = () => {
  const { Sider } = Layout;
  const { pathname } = useLocation();
  const [selectedOption, setSelectedOption] = useState(pathname);
  const isUserSuperAdmin = true;

  const adminNavegationOptions = [
    {
      path: '/optionOne',
      name: 'option one',
    },
    {
      path: '/optionTwo',
      name: 'option two',
    },
    {
      path: '/optionThree',
      name: 'option three',
    },
  ];

  const userNavegationOptions = [
    {
      path: '/optionOne',
      name: 'option one',
    },
    {
      path: '/optionTwo',
      name: 'option two',
    },
    {
      path: '/optionThree',
      name: 'option three',
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
