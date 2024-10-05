'use client'
import '@fontsource/inter';
import { Button } from "@mui/joy";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/signin">
        <Button variant="contained" color="primary">
          Sign In
        </Button>
      </Link>
    </div>
  );
}
