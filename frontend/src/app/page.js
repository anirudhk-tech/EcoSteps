'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from './utils/supabase/client';
import styles from "./styles/Home.module.css";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard');
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className={styles.container}>
      {/* Left section with text */}
      <div className={styles.textSection}>
        <p className={styles.groupNames}>Anirudh</p>
        <p className={styles.groupNames}>Arslan</p>
        <p className={styles.groupNames}>Josh </p>
        <p className={styles.groupNames}>Pranav</p>
        <p className={styles.groupNames}>Sam</p>
      </div>

      
      <div className={styles.arcadeSection}>
        {/* Arcade image */}
        <Link href="/signin">
          <button className={styles.arcadeButton}>START</button>
        </Link>
      </div>

      {/* GitHub icon on the right */}
      <div className={styles.githubIcon}>
        {/* GitHub icon */}
      </div>
    </div>
  );
}
