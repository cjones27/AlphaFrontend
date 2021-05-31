/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal, Calendar, Badge } from 'antd';
import _ from 'lodash';
import styles from './Appointments.module.scss';

const AppointmentModl = (props) => {
  const { visible, handleOk, handleCancel, appointmentData, propertyId } = props;
  const [selectedData, setSelectedData] = useState(null);
  console.log(appointmentData);

  useEffect(() => {
    if (!_.isEmpty(appointmentData)) {
      const selectedProperty = appointmentData.filter(
        (property) => property.property.id === propertyId
      );
      setSelectedData(selectedProperty);
    }
  }, []);

  const data = (value) => {
    if (selectedData && !_.isEmpty(selectedData)) {
      const month = value.month();
      const day = value.date();
      const datesToRender = selectedData.map((dates) => dates.datetime);
      let listData = datesToRender
        .filter((date) => new Date(date).getMonth() === month)
        .filter((date) => new Date(date).getUTCDate() === day + 1)
        .map((date) =>
          new Date(date).toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
          })
        )
        .map((data) => ({
          type: 'success',
          content: data,
        }));
      return listData;
    } else {
      return [];
    }
  };

  const dateCellRender = (value) => {
    const listData = data(value);
    return (
      <ul className={styles.Events}>
        {listData.map((item, index) => (
          <Badge key={index} status={item.type} text={item.content} />
        ))}
      </ul>
    );
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<span className={styles.ModalTitle}> Visitas </span>}
      footer={null}
      width="60%"
    >
      <Calendar
        dateCellRender={(value) => dateCellRender(value)}
        className={styles.Calendar}
        fullscreen={false}
      />
    </Modal>
  );
};

export default AppointmentModl;
