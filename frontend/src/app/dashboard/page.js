'use client'
import styled from 'styled-components';
import OceanLandscape from '../public/background/oceanLandscape.png';
import EcoStepsLogo from '../public/web assets/ecostepsLogo.png';
import Image from 'next/image';
import StreakFire from '../public/web assets/streakFire.png';
import EcoCoin from '../public/web assets/ecoCoin.png';
import { motion } from 'framer-motion';
import { BadgeBar } from '../components/dashboard/badgeBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TasksBox } from '../components/dashboard/taskBox';
import Navbar from '../components/Navbar';


export default function Dashboard() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetch_user = () => {
  //     const supabase = createClient()                          // NEED API. SERVER FUNCTIONS WONT WORK IN CLIENT.

  //     const { data, error } = supabase.auth.getUser()
  //     if (error || !data?.user) {
  //       redirect('/')
  //     } else {
  //       setUser(data.user);
  //     }
  //   };

  //   fetch_user()
  // }, []);

  const router = useRouter();

  const badges = [
    "Cloud Merchant",
    "Arcade Maniac",
    "Life Shield",
  ]

  const streak_days = 100;
  const currency_count = 1976051;

  return (
    <>
    <Container>
      <ProfileColumn>
        <LogoContainer>
          <Image role='button'
          onClick={() => router.push('/globe')}
          src={EcoStepsLogo}
          style={{
            scale: 2,
            width: '17vw',
            height: '15vh',
          }}
          />
        </LogoContainer>
        <ProfileContainer role='navigation'>
          <ProfileCircle></ProfileCircle>
          <Link href={'/marketplace'}>
            <NavigationText>Marketplace</NavigationText>
          </Link>
          <Link href={'/classroom'}>
            <NavigationText>Classroom</NavigationText>
          </Link>
          <Link href={'/globe'}>
            <NavigationText>Globe</NavigationText>
          </Link>
          <Link href={'/ai'}>
            <NavigationText>AI</NavigationText>
          </Link>
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
  gap: 10vh;
  padding-bottom: 9vh;
`

const GeneralColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  height: 100vh;
  gap: 10vh;
  padding-bottom: 9vh;
`

const CurrencyColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 100vh;
  gap: 10vh;
  padding-bottom: 9vh;
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