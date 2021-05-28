import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Button, Card, Calendar, Badge } from 'antd';
import styles from './Appointments.module.scss';

const { getAppointmentsRequest, getPropertiesRequest } = services;

const Appointments = () => {
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [picker, setPicker] = useState({});

  useEffect(async () => {
    const appointments = await getAppointmentsRequest();
    setAppointments([...appointments.response]);
  }, []);

  useEffect(async () => {
    const properties = await getPropertiesRequest();
    setProperties([...properties.response]);
  }, []);

  console.log(appointments);

  const data = (value, propertyId) => {
    const month = value.month();
    const day = value.date();
    const datesToRender = appointments
      .filter((appointment) => appointment.property_id === propertyId)
      .map((dates) => dates.datetime);
    let listData = datesToRender.filter((date) => new Date(date).getMonth() === month);
    listData = listData.filter((date) => new Date(date).getDay() === day);
    listData = listData.map((date) =>
      new Date(date).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    listData = listData.map((data) => ({
      type: 'success',
      content: data,
    }));
    return listData || [];
  };

  const dateCellRender = (value, propertyId) => {
    const listData = data(value, propertyId);
    // console.log(listData);
    return (
      <ul className={styles.Events}>
        {listData.map((item, index) => (
          <Badge key={index} status={item.type} text={item.content} />
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
    console.log(value);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <>
      <Row justify="space-between">
        <Col xs={24}>
          <h1> Reservas </h1>
        </Col>
        {properties.map((propertie, index) => (
          <Col xs={24} md={11} key={index} className={styles.PropertyDiv}>
            <Card className={styles.PropertyCard}>
              <Col xs={24}>
                {propertie.description} {propertie.id}
              </Col>
              {picker[propertie.id] && (
                <Calendar
                  monthCellRender={monthCellRender}
                  dateCellRender={(value) => dateCellRender(value, propertie.id)}
                  className={styles.Calendar}
                  fullscreen={true}
                />
              )}
              <Row>
                <Col xs={24}>
                  <Button
                    className={styles.CreateButton}
                    onClick={() => {
                      const oldPicker = { ...picker };
                      oldPicker[propertie.id] = oldPicker[propertie.id] ? false : true;
                      setPicker({ ...oldPicker });
                    }}
                  >
                    Reservas
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

export default Appointments;
