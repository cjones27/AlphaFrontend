import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card } from 'antd';
import styles from './Users.module.scss';

const { getUsersRequest, deleteUserRequest } = services;

const Properties = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const userResponse = await getUsersRequest();
    setUsers([...userResponse.response]);
  }, []);

  const deleteUser = async (userId) => {
    await deleteUserRequest(userId);
    setUsers([...users.filter((user) => user.id !== userId)]);
  };

  return (
    <>
      <Row justify="space-between">
        <Col xs={24}>
          <h1> Usuarios </h1>
        </Col>
        {users.map((user, index) => (
          <Col xs={24} md={11} key={index} className={styles.PropertyDiv}>
            <Card className={styles.PropertyCard} style={{ borderRadius: '16px' }}>
              <Row>
                <Col xs={24}>
                  {user.first_name} {user.last_name} {user.email}
                </Col>
                <Col xs={24}>
                  <Button
                    className={styles.CreateButton}
                    onClick={() => deleteUser(user.id)}
                  >
                    Eliminar Usuario
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Properties;
