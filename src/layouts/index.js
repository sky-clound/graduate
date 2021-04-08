import styles from './index.css';
import Link from 'umi/link';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Link to= 'test2'>前往test2</Link>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
