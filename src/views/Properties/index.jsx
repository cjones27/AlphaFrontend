import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Form, Input, Button, Card, Modal, Checkbox, Divider } from 'antd';
import styles from './Properties.module.scss';
import AppointmentModal from '../../components/SetAppointments';
import { DollarOutlined } from '@ant-design/icons';
import { isAdmin } from '../../apollo/cache';

const { createPropertyRequest, getPropertiesRequest, deletePropertyRequest } = services;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [visible, setVisibile] = useState(false);
  const [form] = Form.useForm();
  const [water, setWater] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [sewer, setSewer] = useState(false);
  const [createdProperty, setCreatedProperty] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [appointmentModal, setAppointmentModal] = useState(false);

  const createProperty = async (values) => {
    await createPropertyRequest(
      {
        title: values.title,
        area: values.area,
        address: values.address,
        contact: '964796916',
        price: values.price,
        description: values.description,
        water,
        electricity,
        sewer,
        status: 'default',
      },
      localStorage.getItem('userId')
    );
    setVisibile(false);
    setCreatedProperty(!createdProperty);
  };

  const deleteProperty = async (propertyId) => {
    await deletePropertyRequest(propertyId);
    setProperties([...properties.filter((propertie) => propertie.id !== propertyId)]);
  };

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
  }, [createdProperty]);

  return (
    <>
      {appointmentModal ? (
        <AppointmentModal
          visible={appointmentModal}
          handleOk={() => setAppointmentModal(false)}
          handleCancel={() => setAppointmentModal(false)}
          propertyId={propertyId}
        />
      ) : null}
      <Modal
        visible={visible}
        onOk={() => setVisibile(false)}
        onCancel={() => setVisibile(false)}
        title={<span className={styles.ModalTitle}>Crear propiedad</span>}
        footer={null}
        width="60%"
      >
        <Form form={form} onFinish={createProperty}>
          <Row justify="space-between" gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="title">
                <Input label="Nombre" placeholder="nombre" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="description">
                <Input label="Descripción" placeholder="descripción" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="area">
                <Input
                  type="number"
                  label="Área terreno"
                  placeholder="Area del terreno"
                  required
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="address">
                <Input label="Dirección" placeholder="Dirección" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="price">
                <Input type="number" label="Precio" placeholder="Precio" required />
              </Form.Item>
            </Col>
            <Col xs={24} className={styles.CheckBox}>
              <Checkbox
                onClick={() => {
                  setWater(!water);
                }}
              >
                Agua
              </Checkbox>
            </Col>
            <Col xs={24} className={styles.CheckBox}>
              <Checkbox
                onClick={() => {
                  setElectricity(!electricity);
                }}
              >
                Electricidad
              </Checkbox>
            </Col>
            <Col xs={24} className={styles.CheckBox}>
              <Checkbox
                onClick={() => {
                  setSewer(!sewer);
                }}
              >
                Alcantarillado
              </Checkbox>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col>
              <Button onClick={() => setVisibile(false)} color="secondary">
                Cancelar
              </Button>
            </Col>
            <Col>
              <Button htmlType="submit">Crear</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Row justify="space-between">
        <Col xs={24} md={11}>
          <h1> Propiedades </h1>
        </Col>
        <Col xs={24} md={11}>
          <Button className={styles.CreateButton} onClick={() => setVisibile(true)}>
            añadir propiedad
          </Button>
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
                        className={styles.Button}
                        onClick={() => deleteProperty(propertie.id)}
                      >
                        Eliminar propiedad
                      </Button>
                    </Col>
                    <Col md={12} className={styles.PropertyDescription}>
                      <p> {propertie.description} </p>
                    </Col>
                    <Col md={12} className={styles.PropertyDescription}>
                      <Button
                        className={styles.Button}
                        onClick={() => {
                          setAppointmentModal(true);
                          setPropertyId(propertie.id);
                        }}
                      >
                        Ingresar visita
                      </Button>
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

export default Properties;
