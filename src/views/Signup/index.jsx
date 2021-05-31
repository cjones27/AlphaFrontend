import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, DatePicker, Label } from 'antd';
import styles from './Signup.module.scss';
import MessageError from '../../error/message.error';
import services from '../../utils/axios';

const { signupRequest } = services;

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const sendForm = async (values) => {
    try {
      const { first_name, last_name, email, password, date_of_birth } = values;
      const response = await signupRequest({
        first_name,
        last_name,
        email,
        password,
        date_of_birth: date_of_birth.format('YYYY-MM-DD'),
      });
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Looking_out_over_Lago_Conguillio.jpg"
        alt=""
        draggable="false"
      ></img> */}
      <Form form={form} name="login" onFinish={sendForm}>
        <div className={styles.Wrapper}>
          <Row justify="space-between" className={styles.Signup}>
            <Col xs={24}>
              <h2 className={styles.Title}> Registro </h2>
            </Col>
            <Col xs={24} md={11}>
              <Form.Item
                name="first_name"
                className={styles.FormItem}
                rules={[
                  { required: true, message: MessageError.emptyFieldsMessages.username },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.username,
                  },
                ]}
              >
                <Input label="Nombre" placeholder="nombre" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={{ span: 11, offset: 2 }}>
              <Form.Item
                name="last_name"
                className={styles.FormItem}
                rules={[
                  { required: true, message: MessageError.emptyFieldsMessages.username },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.username,
                  },
                ]}
              >
                <Input label="Apellido" placeholder="apellido" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={11}>
              <Form.Item
                name="email"
                className={styles.FormItem}
                rules={[
                  { required: true, message: MessageError.emptyFieldsMessages.username },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.username,
                  },
                ]}
              >
                <Input label="Email" placeholder="email@example.com" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={{ span: 11, offset: 2 }}>
              <Form.Item
                name="password"
                className={styles.FormItem}
                rules={[
                  { required: true, message: MessageError.emptyFieldsMessages.password },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.password,
                  },
                ]}
              >
                <Input.Password label="Contraseña" placeholder="contraseña" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={11}>
              <Form.Item
                name="date_of_birth"
                className={styles.FormItem}
                rules={[
                  {
                    required: true,
                    type: 'object',
                    message: MessageError.emptyFieldsMessages.username,
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  className={styles.DatePicker}
                  placeholder="Fecha de nacimiento"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Button htmlType="submit">Registrarse</Button>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default Signup;
