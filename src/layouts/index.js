import styles from './index.css';
// import Link from 'umi/link';
import { Layout } from 'antd';
import { ReactComponent as Logo } from '../assets/logo-octocat.svg';
import Login from 'components/Login';

const { Header, Content } = Layout;

function BasicLayout(props) {
  return (
    <Layout>
      <Header className={styles.header}>
        <Logo className={styles.logo}></Logo>
        <Login></Login>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
}

export default BasicLayout;
