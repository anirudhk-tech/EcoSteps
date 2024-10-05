'use client'
import styled from 'styled-components';
import Image from 'next/image';
import ForestLandscape from '@/app/public/background/ForestLandscape.png';
import EcoStepsCoin from '@/app/public/web assets/EcoStepsCoin.png';
import { motion } from 'framer-motion';
import { login, signup } from './actions'

const SignIn = () => {

  return (
    <Container>
      <TitleBox>
        <Title>EcoSteps Login</Title>
      </TitleBox>
      <LoginBox>
        <Form>
          <FormPrompt>Email/Username</FormPrompt>
          <InputWrapper>
            <Input type="text" onChange={(e) => setEmail(e.target.value)} />
          </InputWrapper>
          <FormPrompt>Password</FormPrompt>
          <InputWrapper>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
          </InputWrapper>
        </Form>
        <BeginBox>
          <BeginPrompt>PRESS BELOW TO BEGIN</BeginPrompt>
          <motion.div 
            style={{marginTop: '-15vh'}}
            animate={{marginTop: '-20vh'}}
            transition={{
              duration: '0.8',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            >
            <Image 
            src={EcoStepsCoin} 
            alt="Click to begin!" 
            style={{scale: 0.5, height: '70vh'}}
            />
          </motion.div>
        </BeginBox>
      </LoginBox>
    </Container>
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

const Form = styled.div`
  display: 'flex';
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
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
