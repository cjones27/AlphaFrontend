import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';
import styles from './Login.module.scss';
import MessageError from '../../error/message.error';
import services from '../../utils/axios';
import { logged, username, isAdmin } from '../../apollo/cache';

const { loginRequest } = services;

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const sendForm = async (values) => {
    try {
      const { email, password } = values;
      const response = await loginRequest({
        email,
        password,
      });
      const { api_key, id, user_type } = response.response;
      localStorage.setItem('logged', true);
      localStorage.setItem('userId', id);
      localStorage.setItem('username', email);
      localStorage.setItem('apiKey', api_key);
      logged(true);
      username(email);
      isAdmin(user_type === 1);
      history.push('/properties');
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
          <Row justify="center" className={styles.Login}>
            <h2 className={styles.Title}> Inicio de sesión</h2>
            <Col md={24}>
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
                <Input label="Nombre de Usuario" placeholder="nombre" required />
              </Form.Item>
            </Col>
            <Col md={24}>
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
                <Input label="Contraseña" placeholder="contraseña" required />
              </Form.Item>
            </Col>
            <Button htmlType="submit">Iniciar sesión</Button>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default Login;
