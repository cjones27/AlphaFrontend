/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Modal, Row, Col, Form, Button, Input } from 'antd';
import _ from 'lodash';
import styles from './UpdateUserModal.module.scss';
import MessageError from '../../error/message.error';
import services from '../../utils/axios';

const { updateUserRequest } = services;

const UpdateUserModal = (props) => {
  const { visible, handleOk, handleCancel, userData } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const updateData = { ...userData };

    await updateUserRequest(
      {
        ...updateData,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      },
      localStorage.getItem('userId')
    );
    handleOk();
  };

  useEffect(() => {
    if (userData && !_.isEmpty(userData)) {
      form.setFieldsValue({
        first_name: userData.first_name ? userData.first_name : '',
        last_name: userData.last_name ? userData.last_name : '',
        email: userData.email ? userData.email : '',
      });
    }
  }, [userData]);

  // useEffect(() => {
  //   if (
  //     (updateUserData && !_.isEmpty(updateUserData)) ||
  //     (AdminUpdateUserData && !_.isEmpty(AdminUpdateUserData))
  //   ) {
  //     handleOk();
  //   }
  // }, [updateUserData, AdminUpdateUserData]);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<span className={styles.ModalTitle}> Editar </span>}
      footer={null}
      width="60%"
    >
      <Form form={form} onFinish={onFinish}>
        <Row justify="space-between" gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              className={styles.FormItem}
              name="first_name"
              rules={[
                {
                  required: true,
                  message: MessageError.updateFieldsMessages.username,
                },
                {
                  whitespace: true,
                  message: MessageError.updateFieldsMessages.username,
                },
              ]}
            >
              <Input label="Nombre" placeholder="Nombre" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              className={styles.FormItem}
              name="last_name"
              rules={[
                {
                  required: true,
                  message: MessageError.updateFieldsMessages.lastname,
                },
                {
                  whitespace: true,
                  message: MessageError.updateFieldsMessages.lastname,
                },
              ]}
            >
              <Input label="Apellido" placeholder="Apellido" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              className={styles.FormItem}
              name="email"
              rules={[
                {
                  required: true,
                  message: MessageError.updateFieldsMessages.email,
                },
                {
                  whitespace: true,
                  message: MessageError.updateFieldsMessages.email,
                },
              ]}
            >
              <Input label="Email" placeholder="email@example.com" required />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" gutter={16}>
          <Col>
            <Button onClick={handleCancel} color="secondary">
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button htmlType="submit">Editar</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
