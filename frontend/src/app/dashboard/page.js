'use client'
import styled from 'styled-components';
import OceanLandscape from '../public/background/oceanLandscape.png';
import EcoStepsLogo from '../public/web assets/ecostepsLogo.png';
import Image from 'next/image';
import StreakFire from '../public/web assets/streakFire.png';
import EcoCoin from '../public/web assets/ecoCoin.png';
import { TaskBar } from '../components/dashboard/taskBar';
import { motion } from 'framer-motion';
import { BadgeBar } from '../components/dashboard/badgeBar';


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

  const tasks = [
    "Don't use a plastic water bottle today",
    "Go for a 15 minute walk",
    "Read a GLOBE article",
  ]

  const badges = [
    "Cloud Merchant",
    "Arcade Maniac",
    "Life Shield",
  ]

  const streak_days = 100;
  const currency_count = 1976051;

  return (
    <Container>
      <ProfileColumn>
        <LogoContainer>
          <Image 
          src={EcoStepsLogo}
          style={{
            scale: 2,
            width: '17vw',
            height: '15vh',
          }}
          />
        </LogoContainer>
        <ProfileContainer>
          <ProfileCircle></ProfileCircle>
        </ProfileContainer>
      </ProfileColumn>
      <GeneralColumn>
          <SubContainer>
            {
              tasks.map((task, idx) => (
                <TaskBar desc={task} badge_number={idx + 1} />
              ))
            }
          </SubContainer>
          <SubContainer>
            {
              badges.map((badge, idx) => (
                <BadgeBar badge_name={badge} badge_number={idx + 1} />
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
  border: 2px solid black;
  border-radius: 17px;
`

const ProfileContainer = styled.div`
  display: flex;
  flex: 8;
  background-color: rgb(209,201,196);
  margin-right: 3vw;
  margin-left: 3vw;
  border-radius: 17px;
  border: 2px solid black;
`

const SubContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: rgb(209,201,196);
  border-radius: 17px;
  border: 2px solid black;
  flex-direction: column;
  padding: 3vh;
  gap: 2vh;
`

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
margin-left: 25%;
margin-top: 5%;
`