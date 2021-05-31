/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, DatePicker } from 'antd';
import _ from 'lodash';
import styles from './SetAppointments.module.scss';
import services from '../../utils/axios';

const { createAppointmentRequest } = services;

const SetAppointments = (props) => {
  const { visible, handleOk, handleCancel, propertyId } = props;

  const handlePicker = async (values, id) => {
    console.log(values);
    const date = new Date(values._d);
    await createAppointmentRequest({
      datetime: date,
      status: 'default',
      user_id: localStorage.getItem('userId'),
      property_id: id,
    });
    handleOk();
  };

  return (
    <DatePicker
      open
      onOk={(values) => handlePicker(values, propertyId)}
      showTime={{ format: 'HH:mm' }}
      format="DD-MM-YYYY"
      className={styles.DatePicker}
    />
  );
};

export default SetAppointments;
