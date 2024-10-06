'use client'
import styled from 'styled-components';
import Image from 'next/image';
import ForestLandscape from '../public/background/forestLandscape.png';
import EcoStepsCoin from '../public/web assets/EcoStepsCoin.png';
import { motion } from 'framer-motion';
import { login, signup } from './actions'
import { useEffect, useRef, useState } from 'react';
import EcoStepsLogo from '../public/web assets/ecostepsLogo.png';

const SignIn = () => {
  const [start, setStart] = useState(false);
  const formData = useRef(null);

  const handleSignIn = () => { // Defaulting to signup. Need to add functionality to check whether a user already exists so we can route login/signup appropriately.
    const sourceForm = document.getElementById('user_login');
    formData.current = new FormData(sourceForm);
    
    signup(formData.current);
  };

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 500);
  }, []);

  return (
    <motion.div
    animate={start ? {opacity: 1.0} : {opacity: 0.0}}
    transition={{
      duration: start ? '1.0' : '0.0'
    }}
    >
      <Container>
        <TitleBox>
          <TitleContainer>
              <Image 
                src={EcoStepsLogo} 
                alt="EcoSteps Logo" 
                width={300} // Adjust the width as needed
                height={200} // Adjust the height as needed
                style={{ marginLeft: '30px', marginTop: '20px' }} // Space between logo and text
              />
            </TitleContainer>
        </TitleBox>
        <LoginBox>
          <form id="user_login">
            <FormPrompt>Email</FormPrompt>
            <InputWrapper>
              <input id="email" name="email" type="email" required className='input' style={{width: '80%', padding: '10px', fontSize: '16px', border: '2px solid #FFFFFF', backgroundColor: 'rgba(201, 201, 201, 1)', borderRadius: '5px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}} />
            </InputWrapper>
            <FormPrompt>Password</FormPrompt>
            <InputWrapper>
              <input id="password" name="password" type="password" required className='input' style={{width: '80%', padding: '10px', fontSize: '16px', border: '2px solid #FFFFFF', backgroundColor: 'rgba(201, 201, 201, 1)', borderRadius: '5px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}} />
            </InputWrapper>
            {/* Selection: teacher or student */}
            <FormPrompt>Are you a teacher or student?</FormPrompt>
            <InputWrapper>
              <input id="role" name="role" type="text" required className='input' style={{width: '80%', padding: '10px', fontSize: '16px', border: '2px solid #FFFFFF', backgroundColor: 'rgba(201, 201, 201, 1)', borderRadius: '5px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}} />
            </InputWrapper>
            <ButtonWrapper>
              <button formAction={login} className='button' style={{marginTop: '5vh', width: '10vw', height: '5vh', fontSize: '20px', fontFamily: 'var(--font-pixel)', backgroundColor: 'rgb(209,201,196)', color: 'black', border: '2px solid black', borderRadius: '100px', cursor: 'pointer'}}
              > 
                Login 
              </button>
            </ButtonWrapper>
            <ButtonWrapper>
              <button formAction={signup} className='button' style={{marginTop: '5vh', width: '10vw', height: '5vh', fontSize: '20px', fontFamily: 'var(--font-pixel)', backgroundColor: 'rgb(209,201,196)', color: 'black', border: '2px solid black', borderRadius: '100px', cursor: 'pointer'}}
              > 
                Sign Up 
              </button>
            </ButtonWrapper>
          </form>
          <BeginBox>
            <BeginPrompt>PRESS BELOW TO BEGIN</BeginPrompt>
            <form>
              <motion.div 
                style={{marginTop: '-15vh'}}
                animate={{marginTop: '-25vh'}}
                transition={{
                  duration: '0.8',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                >
                    <Image 
                    src={EcoStepsCoin}
                    onClick={handleSignIn}
                    alt="Click to begin!" 
                    style={{scale: 0.5, height: '80vh', cursor: 'pointer', marginLeft: '35px'}}
                    />
              </motion.div>
            </form>
          </BeginBox>
        </LoginBox>
      </Container>
    </motion.div>
  );
};

export default SignIn;

const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  flex: 1;
  background-image: url(${ForestLandscape?.src});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  padding: 10vh;
`;

const LoginBox = styled.div`
  background-color: rgba(201, 201, 201, 1);
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70vh;
`;

const TitleBox = styled.div`
  background-color: rgba(201, 201, 201, 1);
  padding-bottom: 2vh;
  padding-left: 2vh;
  padding-right: 2vh;
  text-align: center;
  display: flex;
  height: 10vh;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-family: var(--font-pixel);
  color: #00000;
  text-shadow: 
    -1px -1px 0px #000000,
    0px -1px 0px #000,
    1px -1px 0px #000,
    -1px  0px 0px #000,
    1px  0px 0px #000,
    -1px  1px 0px #000,
    0px  1px 0px #000,
    1px  1px 0px #000;
  font-size: 7vh;
`;

const FormPrompt = styled.text`
  font-family: var(--font-pixel);
  color: #FFFFFF;
  font-size: 5vh;
  text-align: start;
  display: flex;
`;

const BeginBox = styled.div`
  display: 'flex';
  flex-direction: 'column';
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const BeginPrompt = styled.h1`
  font-family: var(--font-pixel);
  color: rgb(137,97,71);
  font-size: 7vh;
  text-align: center;
`

const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #FFFFFF;
  background-color: rgba(201, 201, 201, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#4CAF50' : '#A52A2A')};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? '#45a049' : '#8B0000')};
  }
`;
