/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import services from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { Row, Col, Input, Form } from 'antd';
import { useReactiveVar } from '@apollo/client';
import { selectedPropertyId } from '../../apollo/cache';
import { useHistory } from 'react-router-dom';
import styles from './Chat.module.scss';

const { createMessageRequest, getMessages } = services;

const Chat = () => {
  const { user_id } = useParams();
  const history = useHistory();
  const propertyId = useReactiveVar(selectedPropertyId);
  const [messages, setMessages] = useState([]);
  const [sendedMessage, setSendedMessage] = useState('');
  const [form] = Form.useForm();
  const [messageObjects, setMessageObjects] = useState([]);

  useEffect(async () => {
    if (!propertyId) {
      history.push('/messages');
    } else {
      const messages = await getMessages();
      setMessages([...messages.response]);
    }
  }, [propertyId, sendedMessage]);

  useEffect(async () => {
    if (messages.length > 0) {
      renderMessages();
    }
  }, [messages]);

  const sendMessage = async (values) => {
    await createMessageRequest({
      sent_by_id: parseInt(localStorage.getItem('userId')),
      sent_to_id: parseInt(user_id),
      content: values.message,
      property_id: parseInt(propertyId),
      status: 'status',
      message_type: 'type',
    });
    setSendedMessage('');
  };

  const createMessages = (messagesList) => {
    const createdMessages = messagesList.map((message) => {
      let styledMessage;
      if (message.sendBy === parseInt(localStorage.getItem('userId'))) {
        styledMessage = (
          <div className={styles.MyMessage}>
            <p> {message.content} </p>
          </div>
        );
      } else {
        styledMessage = (
          <div className={styles.OtherMessage}>
            <p> {message.content} </p>
          </div>
        );
      }
      return styledMessage;
    });
    setMessageObjects([...createdMessages]);
  };

  const renderMessages = () => {
    const filter = messages
      .filter(
        (message) =>
          (message.sent_by_id === parseInt(localStorage.getItem('userId')) &&
            message.sent_to_id === parseInt(user_id)) ||
          (message.sent_to_id === parseInt(localStorage.getItem('userId')) &&
            message.sent_by_id === parseInt(user_id))
      )
      .map((message) => {
        const messageObject = {
          sendBy: parseInt(message.sent_by_id),
          content: message.content,
        };
        return messageObject;
      });
    createMessages(filter);
  };

  return (
    <>
      <Form
        form={form}
        name="login"
        onFinish={sendMessage}
        className={styles.ChatContainer}
      >
        <div className={styles.RowContainer}>
          <div className={styles.ContentContainer}>
            {messageObjects.map((message) => message)}
          </div>
          <Col xs={24} className={styles.MessageContainer}>
            <Form.Item name="message">
              <Input
                onChange={(value) => setSendedMessage(value.target.value)}
                label="Nombre de Usuario"
                placeholder="Escriba un mensaje..."
                value={sendedMessage}
              />
            </Form.Item>
          </Col>
        </div>
      </Form>
    </>
  );
};

export default Chat;
