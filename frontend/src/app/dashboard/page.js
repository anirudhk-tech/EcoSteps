'use client'
import styled from 'styled-components';
import OceanLandscape from '../public/background/oceanLandscape.png';
import { useState } from 'react';
import EcoStepsLogo from '../public/web assets/ecostepsLogo.png';
import Image from 'next/image';
import StreakFire from '../public/web assets/streakFire.png';
import EcoCoin from '../public/web assets/ecoCoin.png';
import { motion } from 'framer-motion';
import { BadgeBar } from '../components/dashboard/badgeBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TasksBox } from '../components/dashboard/taskBox';
import { createClient } from '../utils/supabase/client';
import bunnyAvatarGold from '../public/avatars/bunnyAvatarGold.png';
import bunnyAvatarSilver from '../public/avatars/bunnyAvatarSilver.png';
import bunnyAvatarBronze from '../public/avatars/bunnyAvatarBronze.png';
import bunnyAvatarWood from '../public/avatars/bunnyAvatarWood.png';

import birdAvatarGold from '../public/avatars/birdAvatarGold.png';
import birdAvatarSilver from '../public/avatars/birdAvatarSilver.png';
import birdAvatarBronze from '../public/avatars/birdAvatarBronze.png';
import birdAvatarWood from '../public/avatars/birdAvatarWood.png';

import fishAvatarGold from '../public/avatars/fishAvatarGold.png';
import fishAvatarSilver from '../public/avatars/fishAvatarSilver.png';
import fishAvatarBronze from '../public/avatars/fishAvatarBronze.png';
import fishAvatarWood from '../public/avatars/fishAvatarWood.png';

import wolfAvatarGold from '../public/avatars/wolfAvatarGold.png';
import wolfAvatarSilver from '../public/avatars/wolfAvatarSilver.png';
import wolfAvatarBronze from '../public/avatars/wolfAvatarBronze.png';
import wolfAvatarWood from '../public/avatars/wolfAvatarWood.png';


export default function Dashboard() {

  const avatars = [
    bunnyAvatarGold, bunnyAvatarSilver, bunnyAvatarBronze, bunnyAvatarWood,
    birdAvatarGold, birdAvatarSilver, birdAvatarBronze, birdAvatarWood,
    fishAvatarGold, fishAvatarSilver, fishAvatarBronze, fishAvatarWood,
    wolfAvatarGold, wolfAvatarSilver, wolfAvatarBronze, wolfAvatarWood,
  ];

  const [currentAvatar, setCurrentAvatar] = useState(bunnyAvatarSilver);

  const switchAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    setCurrentAvatar(avatars[randomIndex]);
  };

  const router = useRouter();

  const badges = [
    "Ocean Defender",
    "Recycle Maniac",
    "Bird Watcher",
  ]

  const streak_days = 100;
  const currency_count = 1976051;


  const handleSignout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/signin');
  }

  return (
    <>
    <Container>
      <ProfileColumn>
        <LogoContainer>
          <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'reverse', 
              }}
            >
              <Image 
              onClick={() => router.push('/globe')}
              src={EcoStepsLogo}
              style={{
                scale: 1.75,
                width: '17vw',
                height: '15vh',
              }}
              />
          </motion.div>
        </LogoContainer>
        <ProfileContainer>
          <Image
              src={currentAvatar}
              alt="Avatar"
              style={{
                height: '25vh', 
                width: '25vh',
              }}
              onClick={switchAvatar}
            />
          <Link href={'/marketplace'}>
            <NavigationText>Marketplace</NavigationText>
          </Link>
          <Link href={'/classroom'}>
            <NavigationText>Classroom</NavigationText>
          </Link>
          <button onClick={handleSignout}
          className='button' style={{marginTop: '5vh', width: '10vw', height: '5vh', fontSize: '20px', fontFamily: 'var(--font-pixel)', backgroundColor: 'rgb(209,201,196)', color: 'black', border: '2px solid black', borderRadius: '100px', cursor: 'pointer'}}
          >
            Sign Out
          </button>
        </ProfileContainer>
      </ProfileColumn>
      <GeneralColumn>
          <TasksBox/>
          <SubContainer>
            {
              badges.map((badge, idx) => (
                <BadgeBar key={idx} badge_name={badge} badge_number={idx + 1} />
              ))
            }
          </SubContainer>
      </GeneralColumn>
      <CurrencyColumn>
          <SubContainer>
            <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.0,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            >
              <Image 
              src={StreakFire}
              style={{scale: 3, height: '24vh'}}
              />
            </motion.div>
            <CurrencyText>{streak_days} Days</CurrencyText>
          </SubContainer>
          <SubContainer>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              <Image 
              src={EcoCoin}
              style={{scale: 3, height: '24vh'}}
              />
            </motion.div>
            <CurrencyText>{currency_count}</CurrencyText>
          </SubContainer>
      </CurrencyColumn>
    </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  flex-direction: row;
  background-image: url(${OceanLandscape?.src});
  background-size: cover;
  background-position: center;
  padding: 3vw;
  overflow: hidden;
  gap: 5vw;
`

const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100vh;
  gap: 5vh;
  padding-bottom: 20vh;
`

const GeneralColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  height: 100vh;
  gap: 5vh;
  padding-bottom: 20vh;
`

const CurrencyColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 100vh;
  gap: 5vh;
  padding-bottom: 50vh;
`

const LogoContainer = styled.div`
  display: flex;
  flex: 2;
  background-color: rgb(209,201,196);
  clip-path: polygon(3% 0, 97% 0, 100% 10%, 100% 90%, 97% 100%, 3% 100%, 0 90%, 0 13%);
  align-items: center;
  justify-content: center;
  padding-left: 5vh;
  clip-path: polygon(20px 0px, calc(100% - 20px) 0px, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0px calc(100% - 20px), 0px 20px);
  cursor: pointer;
`

const ProfileContainer = styled.div`
  display: flex;
  flex: 8;
  background-color: rgb(209,201,196);
  margin-right: 3vw;
  margin-left: 3vw;
  clip-path: polygon(30px 0px, calc(100% - 30px) 0px, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0px calc(100% - 30px), 0px 30px);
  flex-direction: column;
  align-items: center;
`

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: rgb(209,201,196);
  flex-direction: column;
  padding: 3vh;
  gap: 2vh;
  clip-path: polygon(30px 0px, calc(100% - 30px) 0px, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0px calc(100% - 30px), 0px 30px);
`;

const CurrencyText = styled.text`
  font-size: 30px;
  font-family: var(--font-pixel);
  align-self: center;
  color: #000000;
`

const ProfileCircle = styled.div`
  border-radius: 100px;
  border: 2px solid black;
  box-shadow: 0 0 4px 10px 10px;
  height: 20vh;
  width: 10vw;
  display: flex;
  margin-top: 5%;
`

const NavigationText = styled.text`
  font-family: var(--font-pixel);
  font-size: 5vh;
  color: black;
`