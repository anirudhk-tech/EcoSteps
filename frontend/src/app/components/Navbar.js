import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <Link href="/articles">
          <p className={styles.navLink}>Articles</p>
        </Link>
        <Link href="/tasks">
          <p className={styles.navLink}>Tasks</p>
        </Link>
        <Link href="/profile">
          <p className={styles.navLink}>Profile</p>
        </Link>
        <Link href="/globe">
          <p className={styles.navLink}>Globe</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
