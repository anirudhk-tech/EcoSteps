'use client'
import styled from 'styled-components';
import Link from 'next/link';
import { supabase } from '../../supabaseClient';
import { useState } from 'react';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      console.log('Login successful:', user);
      navigate('/dashboard');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>EcoSteps Login</Title>
        <Form>
          <InputWrapper>
            <Input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <LeafIcon>🌱</LeafIcon>
          </InputWrapper>
          <ButtonWrapper>
            <Link href="/pages/signup" passHref>
              <Button>Sign Up</Button>
            </Link>
            <Button primary onClick={handleLogin}>Sign In</Button>
          </ButtonWrapper>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/forest-background.png');
  background-size: cover;
  background-position: center;
`;

const LoginBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeafIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
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
