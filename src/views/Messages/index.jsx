import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card, Calendar, Badge } from 'antd';
import styles from './Messages.module.scss';

const { getPropertiesRequest } = services;

const Messages = () => {
  const [properties, setProperties] = useState([]);

  useEffect(async () => {
    const properties = await getPropertiesRequest();
    setProperties([...properties.response]);
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col xs={24}>
          <h1> Mensajes </h1>
        </Col>
        {properties.map((propertie, index) => (
          <Col xs={24} key={index} className={styles.PropertyDiv}>
            <Card className={styles.PropertyCard}>
              <Col xs={24}>
                {propertie.description} {propertie.id}
              </Col>
              <Row>
                <Col xs={24}>
                  <Button className={styles.CreateButton}>Ver mensajes</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Messages;
