import React, { useContext } from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import SideMenu from '../SideMenu';
import styles from './Layout.module.scss';
import { SessionContext } from '../../context/session';

// eslint-disable-next-line react/prop-types
const LayoutBar = ({ children }) => {
  const { logged } = useContext(SessionContext);

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
