import React, { useEffect } from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import styles from './Layout.module.scss';
import { useReactiveVar } from '@apollo/client';
import { logged, username, isAdmin } from '../../apollo/cache';
import services from '../../utils/axios';

const { getUserRequest } = services;

// eslint-disable-next-line react/prop-types
const LayoutBar = ({ children }) => {
  const loggedVar = useReactiveVar(logged);

  useEffect(async () => {
    if (localStorage.getItem('logged') === 'true') {
      logged(true);
      username(localStorage.getItem('username'));
      const id = localStorage.getItem('userId');
      const user = await getUserRequest(id);
      if (user.response.user_type === 1) {
        isAdmin(true);
      }
    }
  }, [loggedVar]);

  return (
    <>
      <div className={styles.Container}>
        <NavBar />
        <Layout>
          {loggedVar && <SideMenu />}
          <main>{children}</main>
        </Layout>
      </div>
    </>
  );
};

export default LayoutBar;
