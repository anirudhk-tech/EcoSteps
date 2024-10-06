'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from './utils/supabase/client';
import Link from 'next/link';
import ArcadeEntry from './public/background/arcadeUpdatedBackground.png';
import GitHub from './public/web assets/githubLogo.png';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import StartButton from '../app/public/web assets/arcadeEntryUnpressed.png'
import StartButtonPressed from '../app/public/web assets/arcadeEntryPressed.png';
import EcoStepsLogo from '../app/public/web assets/ecostepsLogo.png';

export default function Home() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  const handleStartPress = () => {
    setPressed(true);
    setTimeout(() => {
      router.push('/signin')
    }, 500);
  };

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
    <motion.div
      animate={pressed ? {scale: 100, opacity: 0.0} : {}}
      transition={{
        type: "spring",
        stiffness: 5,
        damping: 10,
      }}
      style={{
        originY: '27vh',
      }}
    >
      <Container>
          <Image 
          onClick={handleStartPress}
          src={pressed ? StartButton : StartButtonPressed} 
          style={StartButtonStyle}
          />
          <StartText
          onClick={handleStartPress}
          >DIVE IN</StartText>
          <TextSection>
            <Image 
              src={EcoStepsLogo} 
              alt="EcoSteps Logo" 
              style={{
                width: '500px',
                height: 'auto', 
                alignSelf: 'center', 
              }}
            />
            <motion.div
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'var(--font-pixel)',
              display: 'flex',
              flexDirection: 'column',
            }}
            animate={{opacity: 0.5}}
            transition={{
            duration: '1.75',
            repeat: Infinity,
            repeatType: 'reverse',
            }}
            >
            <GroupNames>Anirudh</GroupNames>
            <GroupNames>Arslan</GroupNames>
            <GroupNames>Josh </GroupNames>
            <GroupNames>Pranav</GroupNames>
            <GroupNames>Sam</GroupNames>
            </motion.div>
          </TextSection>
        <motion.div
        animate={{
          y: 20,
        }}
        transition={{
          duration: '1.0',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        >
          <Link href={'https://github.com/anirudhk-tech/EcoSteps'} target='_blank'>
            <Image
            style={{scale: 1}} 
            src={GitHub}/>
          </Link>
        </motion.div>
      </Container>
    </motion.div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  background-image: url(${ArcadeEntry?.src});
  background-size: cover;
  background-position: center;
  padding: 5vh;
  gap: 140vh;
  overflow: hidden;
  position: absolute;
`

const TextSection = styled.text`
  color: white;
  text-align: center;
  font-family: var(--font-pixel);
  display: flex;
  flex-direction: column;
`

const GroupTitle = styled.text`
  font-size: 8vh;
  font-family: var(--font-pixel);
  margin-bottom: 10px;
`

const GroupNames = styled.text`
  font-size: 5vh;
`

const StartText = styled.text`
  font-family: var(--font-pixel);
  font-color: white;
  width: 20vw;
  height: 40vh;
  font-size: 5vh;
  margin-left: 37.75%;
  position: absolute;
  text-align: center;
  padding-top: 12vh;
  margin-top: 30%;
  cursor: pointer;
`

const StartButtonStyle = {
  position: 'absolute',
  height: '40vh',
  width: '20vw',
  marginLeft: '37.5%',
  marginTop: '30%',
}