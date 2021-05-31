import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card, Spin } from 'antd';
import styles from './Profile.module.scss';
import UserFormModal from '../../components/UserFormModal';

const { getUserRequest } = services;

const Profile = () => {
  const [user, setUser] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(async () => {
    const id = localStorage.getItem('userId');
    const user = await getUserRequest(id);
    setUser(user.response);
  }, [editModalVisible]);

  return (
    <>
      {editModalVisible ? (
        <UserFormModal
          visible={editModalVisible}
          handleOk={() => setEditModalVisible(false)}
          handleCancel={() => setEditModalVisible(false)}
          userData={user}
        />
      ) : null}
      <Row>
        <Col xs={24} className={styles.EditInformation}>
          <h1> Información de contacto </h1>
        </Col>
        <Col xs={24} className={styles.CardContainer}>
          {user && (
            <Card className={styles.ContactInformation}>
              <Col className={styles.EditContactInformationButton}>
                <p>Nombre: {user.first_name}</p>
                <Button onClick={() => setEditModalVisible(true)}>
                  Editar Información
                </Button>
              </Col>
              <p>Apellido: {user.last_name}</p>
              <p>Email: {user.email}</p>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Profile;
