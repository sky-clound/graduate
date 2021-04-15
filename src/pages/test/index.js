import React, { Component } from 'react';
import { connect } from 'dva';

class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'getUser',
      payload: {
        data: '111111111',
      },
    });
  }

  render() {
    return <div>测试路由</div>;
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Test);
