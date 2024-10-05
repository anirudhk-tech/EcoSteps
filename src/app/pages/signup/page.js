'use client'
import styled from 'styled-components';

const SignUpPage = () => {
  return (
    <Container>
      <SignUpBox>
        <Title>Sign Up</Title>
        <Form>
          <InputWrapper>
            <label>Email / Username :</label>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper>
            <label>Password :</label>
            <Input type="password" />
          </InputWrapper>
          <InputWrapper>
            <label>Password Again :</label>
            <Input type="password" />
          </InputWrapper>
          <Message>Press Below to Begin</Message>
          <CoinButton>
            <LeafIcon>🍃</LeafIcon>
          </CoinButton>
        </Form>
      </SignUpBox>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/forest-background.png');
  background-size: cover;
  background-position: center;
`;

const SignUpBox = styled.div`
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

const Message = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #A52A2A;
  margin-bottom: 20px;
`;

const CoinButton = styled.button`
  background-color: #FFD700;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  border: 5px solid #8B4513;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const LeafIcon = styled.span`
  font-size: 32px;
`;
