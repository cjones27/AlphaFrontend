import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card, Divider } from 'antd';
import styles from './Appointments.module.scss';
import AppointmentModal from '../../components/Appointments';
import { isAdmin } from '../../apollo/cache';

const { getAppointmentsRequest, getPropertiesRequest } = services;

const Appointments = () => {
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [propertyId, setPropertyId] = useState(null);
  const [appointmentModal, setAppointmentModal] = useState(false);

  useEffect(async () => {
    const appointments = await getAppointmentsRequest();
    console.log(appointments);
    setAppointments([...appointments.response]);
  }, []);

  useEffect(async () => {
    let propertiesResponse = await getPropertiesRequest();
    console.log(propertiesResponse);
    console.log(parseInt(localStorage.getItem('userId')));
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

  return (
    <>
      {appointmentModal ? (
        <AppointmentModal
          visible={appointmentModal}
          handleOk={() => setAppointmentModal(false)}
          handleCancel={() => setAppointmentModal(false)}
          appointmentData={appointments}
          propertyId={propertyId}
        />
      ) : null}
      <Row justify="space-between">
        <Col xs={24}>
          <h1> Reservas </h1>
        </Col>
        {properties.map((propertie, index) => (
          <Col xs={24} key={index} className={styles.PropertyDiv}>
            <Card className={styles.PropertyCard} style={{ borderRadius: '16px' }}>
              <Row>
                <Col md={6}>
                  <img
                    className={styles.PropertyImage}
                    src="https://i.pinimg.com/originals/45/90/b7/4590b78d130665700afaa2e718e3efdf.png"
                    alt=""
                  ></img>
                </Col>
                <Col offset={2} md={16} className={styles.PropertyDescription}>
                  <Row>
                    <Col md={12} className={styles.PropertyDescription}>
                      <h2> {propertie.title} </h2>
                    </Col>
                    <Col md={12} className={styles.PropertyDescription}>
                      <Button
                        className={styles.CreateButton}
                        onClick={() => {
                          setAppointmentModal(true);
                          setPropertyId(propertie.id);
                        }}
                      >
                        Ver reservas
                      </Button>
                    </Col>
                    <Col md={12} className={styles.PropertyDescription}>
                      <p> {propertie.description} </p>
                    </Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col md={8} className={styles.PropertyDescription}>
                      <p> Direccion: {propertie.address} </p>
                    </Col>
                    <Col md={8} className={styles.PropertyDescription}>
                      <p> Contacto:{propertie.contact} </p>
                    </Col>
                    <Col md={8} className={styles.PropertyDescription}>
                      <p> Area terreno: {propertie.area} </p>
                    </Col>
                    <Col md={8} className={styles.PropertyDescription}>
                      <p> Precio: {propertie.price} </p>
                    </Col>
                    <Col md={8} className={styles.PropertyDescription}>
                      {propertie.water && <p> Agua </p>}
                    </Col>
                    <Col md={8} className={styles.PropertyDescription}>
                      {propertie.electricity && <p> Electricidad </p>}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Appointments;
