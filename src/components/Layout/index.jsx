import React, { useEffect } from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import styles from './Layout.module.scss';
import { useReactiveVar } from '@apollo/client';
import { logged, username } from '../../apollo/cache';

// eslint-disable-next-line react/prop-types
const LayoutBar = ({ children }) => {
  const loggedVar = useReactiveVar(logged);

  useEffect(() => {
    if (localStorage.getItem('logged') === 'true') {
      logged(true);
      username(localStorage.getItem('username'));
    }
  }, []);

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
