import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Form, message, Button, Input  } from 'antd';
import MessageError from '../../error/message.error';
import styles from './Signup.module.scss';

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  const sendForm = async (values) => {
    console.log(values);
  };

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Looking_out_over_Lago_Conguillio.jpg" alt="" draggable="false"></img>
      <Form form={form} name="login" onFinish={sendForm}>
        <div className={styles.Wrapper}>
          <Row justify="center" className={styles.SignUp}>
            <h2 className={styles.Title}> Registro</h2>
            <Col md={24}>
              <Form.Item
                name="email"
                className={styles.FormItem}
                rules={[
                  {
                    required: true,
                    message: MessageError.emptyFieldsMessages.contactMail,
                  },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.contactMail,
                  },
                ]}
              >
                <Input label="Email" placeholder="email@example.com" required />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item
                name="name"
                className={styles.FormItem}
                rules={[
                  { required: true, message: MessageError.emptyFieldsMessages.username },
                  {
                    whitespace: true,
                    message: MessageError.emptyFieldsMessages.username,
                  },
                ]}
              >
                <Input label="Nombre de usuario" placeholder="nombre" required />
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
                <Input password label="Contraseña" placeholder="contraseña" required />
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
