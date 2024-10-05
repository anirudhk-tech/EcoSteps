'use client';

import '@fontsource/inter';  // For the custom font
import { Button, Typography, Stack, Box } from "@mui/joy";  // Material UI components
import Link from "next/link";
import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to EcoSteps
      </Typography>
      
      <Typography variant="body1" gutterBottom className={styles.description}>
        Start your journey towards an eco-friendly lifestyle with our app.
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center">
        <Link href="/pages/signin" passHref>
          <Button variant="solid" color="success" size="large">
            Sign In
          </Button>
        </Link>
        <Link href="/pages/signup" passHref>
          <Button variant="solid" color="primary" size="large">
            Sign Up
          </Button>
        </Link>
      </Stack>
    </div>
  );
}
