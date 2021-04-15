import React, { Component } from 'react';
import styles from './index.css';
import { Dropdown, Menu } from 'antd';
import LoginModal from 'components/LoginModal';
import { ReactComponent as Login } from 'assets/unlogin.svg';

export default class LoginUser extends Component {
  state = {
    isLogin: 0,
    visible: false,
  };

  handleClick = ({ key }) => {
    this.setState({
      isLogin: 1 * key,
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isLogin, visible } = this.state;
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item key="0" style={{ width: 100 }}>
          登录
        </Menu.Item>
        <Menu.Item key="1" style={{ width: 100 }}>
          注册
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown
          overlay={menu}
          placement="bottomCenter"
          overlayClassName="dropList"
        >
          <Login className={styles.login}></Login>
        </Dropdown>
        <LoginModal
          key={isLogin}
          isLogin={isLogin}
          visible={visible}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}
