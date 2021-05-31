import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card, Calendar, Badge } from 'antd';
import styles from './Messages.module.scss';
import { useHistory } from 'react-router-dom';
import { selectedPropertyId } from '../../apollo/cache';
import { isAdmin } from '../../apollo/cache';

const { getPropertiesRequest, getUsersRequest } = services;

const Messages = () => {
  const history = useHistory();
  const [properties, setProperties] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    let propertiesResponse = await getPropertiesRequest();
    if (!isAdmin()) {
      propertiesResponse = propertiesResponse.response.filter((propertie) => {
        if (parseInt(propertie.user.id) === parseInt(localStorage.getItem('userId'))) {
          return propertie;
        }
      });
    } else {
      propertiesResponse = propertiesResponse.response;
    }

    setProperties([...propertiesResponse]);
  }, []);

  useEffect(async () => {
    let userResponse = await getUsersRequest();
    userResponse = userResponse.response.filter(
      (user) => parseInt(user.id) !== parseInt(localStorage.getItem('userId'))
    );
    setUsers([...userResponse]);
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col xs={24}>
          <h1> Mensajes </h1>
        </Col>

        {!showMessages ? (
          properties.map((propertie, index) => (
            <Col xs={24} key={index} className={styles.PropertyDiv}>
              <Card className={styles.PropertyCard} style={{ borderRadius: '16px' }}>
                <Col xs={24}>
                  {propertie.description} {propertie.id}
                </Col>
                <Row>
                  <Col xs={24}>
                    <Button
                      className={styles.CreateButton}
                      onClick={() => {
                        setShowMessages(true);
                        setPropertyId(propertie.id);
                      }}
                    >
                      Ver mensajes
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <>
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
                        onClick={() => {
                          selectedPropertyId(propertyId);
                          history.push(`/messages/${user.id}`);
                        }}
                      >
                        Ver mensajes
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};

export default Messages;
