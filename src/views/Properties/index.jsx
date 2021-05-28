import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { Row, Col, Form, Input, Button, Card, Modal, Checkbox, DatePicker } from 'antd';
import styles from './Properties.module.scss';

const {
  createPropertyRequest,
  getPropertiesRequest,
  deletePropertyRequest,
  createAppointmentRequest,
} = services;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [visible, setVisibile] = useState(false);
  const [form] = Form.useForm();
  const [water, setWater] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [sewer, setSewer] = useState(false);
  const [createdProperty, setCreatedProperty] = useState(false);
  const [picker, setPicker] = useState({});

  const createProperty = async (values) => {
    await createPropertyRequest(
      {
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

  const handlePicker = async (values, id) => {
    const date = new Date(values._d).toISOString();
    const datetime = new Date(date.slice(0, date.indexOf('T'))).toISOString();
    const response = await createAppointmentRequest({
      datetime,
      status: 'default',
      user_id: localStorage.getItem('userId'),
      property_id: id,
    });
    console.log(response);
  };

  useEffect(async () => {
    const properties = await getPropertiesRequest();
    console.log;
    setProperties([...properties.response]);
  }, [createdProperty]);

  return (
    <>
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
              <Form.Item className={styles.FormItem} name="name">
                <Input label="Nombre" placeholder="nombre" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item className={styles.FormItem} name="description">
                <Input label="Descripción" placeholder="descripción" required />
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
          <Col xs={24} md={11} key={index} className={styles.PropertyDiv}>
            <Card className={styles.PropertyCard}>
              <Row>
                <Col xs={24}>
                  {propertie.description} {propertie.id}
                </Col>
                <Col xs={24}>
                  <Button
                    className={styles.CreateButton}
                    onClick={() => deleteProperty(propertie.id)}
                  >
                    Eliminar propiedad
                  </Button>
                </Col>
                <Col xs={24}>
                  <Button
                    className={styles.CreateButton}
                    onClick={() => {
                      const oldPicker = { ...picker };
                      oldPicker[propertie.id] = oldPicker[propertie.id] ? false : true;
                      setPicker({ ...oldPicker });
                    }}
                  >
                    Ingresar visita
                  </Button>
                  {picker[propertie.id] && (
                    <DatePicker
                      onOk={(values) => handlePicker(values, propertie.id)}
                      showTime={{ format: 'HH:mm' }}
                      format="DD-MM-YYYY"
                      className={styles.DatePicker}
                      placeholder="Agregar visita"
                    />
                  )}
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
