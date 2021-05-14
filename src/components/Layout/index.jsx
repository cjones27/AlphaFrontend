import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import styles from './Layout.module.scss';

// eslint-disable-next-line react/prop-types
const LayoutBar = ({ children }) => {
  // useEffect(() => {
  //   if (localStorage.getItem('IdToken') !== null) {
  //     logged(true);
  //   }
  // }, []);

  const logged = false;

  return (
    <>
      <div className={styles.Container}>
        <NavBar />
        <Layout>
          {logged && <SideMenu />}
          <main>{children}</main>
        </Layout>
      </div>
    </>
  );
};

export default LayoutBar;
