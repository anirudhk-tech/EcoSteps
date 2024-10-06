'use client'
import styled from "styled-components"
import MarketBackground from '../public/background/marketplaceBackground.png';
import EcoCoin from '../public/web assets/ecoCoin.png';
import Image from "next/image";
import { EcoLogo } from "../components/marketplace/eco_logo";
import Target from '../public/web assets/target(1).png';

export default function Home () {

    return (
        <Container>
            <EcoLogo marginTop={'2.5%'}/>
            <MoneyContainer>
                <Image 
                src={Target}
                style={{
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                }}
                />
                <MoneyText>12483748</MoneyText>
            </MoneyContainer>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${MarketBackground?.src});
  background-size: cover;
  background-position: center;
`

const MoneyContainer = styled.div`
    width: 25vw;
    height: 15vh;
    background-color: rgb(209,201,196);
    position: absolute;
    margin-left: 70%;
    margin-top: 5%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
`

const MoneyText = styled.text`
    font-family: var(--font-pixel);
    font-size: 30px;
    color: black;
`