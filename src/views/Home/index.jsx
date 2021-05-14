import React from 'react';
import { Row, Col, Form, message, Button, Input  } from 'antd';
import styles from './Home.module.scss';

const Home = () => {
  const { Search } = Input;

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Looking_out_over_Lago_Conguillio.jpg" alt="" draggable="false"></img>
      <div className={styles.SearchContainer}>
        <Search placeholder="Qué propiedad estás buscando..." onSearch={{}} enterButton />
      </div>
    </>
  );
};

export default Home;
