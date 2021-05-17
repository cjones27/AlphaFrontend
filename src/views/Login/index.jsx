import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';
import styles from './Login.module.scss';
import MessageError from '../../error/message.error';
import { SessionContext } from '../../context/session';


const Login= () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { setLogged } = useContext(SessionContext);

  const sendForm = async (values) => {
    localStorage.setItem('logged', true);
    setLogged(true);
    history.push('/Properties');
  };

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Looking_out_over_Lago_Conguillio.jpg" alt="" draggable="false"></img>
      <Form form={form} name="login" onFinish={sendForm}>
        <div className={styles.Wrapper}>
          <Row justify="center" className={styles.Login}>
            <h2 className={styles.Title}> Inicio de sesión</h2>
            <Col md={24}>
              <Form.Item
                name="username"
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
                <Input password label="Contraseña" placeholder="contraseña" required />
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
