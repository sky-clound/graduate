import React, { Component } from 'react';
import { Modal } from 'antd';
import LoginForm from 'components/LoginForm';
import RegForm from 'components/RegForm';

export default class LoginOrRegister extends Component {
  render() {
    const { isLogin, visible, hideModal } = this.props;
    return (
      <div>
        <Modal
          title={isLogin ? '注册' : '登录'}
          visible={visible}
          onOk={hideModal}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消"
          footer={null}
        >
          {!isLogin ? <LoginForm /> : <RegForm />}
        </Modal>
      </div>
    );
  }
}
