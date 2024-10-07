'use client'
import styled from "styled-components"
import MarketBackground from '../public/background/marketplaceBackground.png';
import EcoCoin from '../public/web assets/ecoCoin.png';
import Image from "next/image";
import { TargetLogo } from "../components/marketplace/target_logo";
import { DaisyLogo } from "../components/marketplace/daisy_logo";
import { PotteriLogo } from "../components/marketplace/pottery_logo";

export default function Home () {

    return (
        <Container>
            <TargetLogo marginTop={'7%'}/>
            <DaisyLogo marginTop={'15%'}/>
            <PotteriLogo marginTop={'35%'}/>
            <MoneyContainer>
                <Image 
                src={EcoCoin}
                style={{
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                }}
                />
                <MoneyText>1493</MoneyText>
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