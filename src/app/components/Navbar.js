import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { createClient } from '../utils/supabase/server'

export default async function Navbar() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }

    return (
        <nav className={styles.navbar}>
        <div className={styles.navItems}>
            <Link href="/dashboard">
                <p className={styles.navLink}>Dashboard</p>
            </Link>
            <Link href="/tasks">
                <p className={styles.navLink}>Tasks</p>
            </Link>
            <Link href="/globe">
                <p className={styles.navLink}>Globe</p>
            </Link>
        </div>
        </nav>
    );
};