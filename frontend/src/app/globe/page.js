'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Arrow from '../public/web assets/arrow.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [globePressed, setGlobePressed] = useState(false);
  const router = useRouter();

  const handleGlobeClick = () => {
    router.push('/ai');
  }

  return (
      <Container>
          <motion.div
          animate={globePressed ? { opacity: 0.0 } : {y: 10}}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2.0,
            },
            opacity: {
              duration: 1.0,
            }
          }}
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            gap: '5vw',
            backgroundColor: 'rgb(209,201,196)',
          }}
          >
          <Column>
            <Scroll>
              <Title
              style={{
                color: 'blue',
              }}
              >Water</Title>
              <Text>
                Water is one of the most essential elements for life on Earth, but it faces numerous threats due to pollution, overuse, and climate change. 
              </Text>
            </Scroll>
            <Scroll>
              <Title
              style={{
                color: '#FDE541',
              }}
              >Energy</Title>
              <Text>
              The beauty of energy is marred by its significant contribution to greenhouse gas emissions through fossil fuel reliance, which accelerates climate change and pollutes our air and water. 
              </Text>
            </Scroll>
            <Scroll>
              <Title
              style={{
                color: 'darkgreen',
              }}
              >Garbage</Title>
              <Text>
              With every discarded item, we contribute to the overwhelming mountains of waste that pollute our landscapes, choke our oceans, and harm wildlife. 
              </Text>
            </Scroll>
          </Column>
          <Column>
            <Scroll>
              <Title
              style={{
                color: 'grey',
              }}
              >Urbanization</Title>
              <Text>
              As cities expand and concrete jungles replace lush greenery, we risk losing vital habitats for countless species and diminishing the air quality that nourishes our communities. 
              </Text>
            </Scroll>
            <Spacer></Spacer>
            <Scroll>
              <Title
              style={{
                color: 'teal',
              }}
              >Organisms</Title>
              <Text>
              The richness of life on Earth, from the tiniest microbes to the grandest mammals, weaves an intricate tapestry of ecosystems that sustain our planet.
              </Text>
            </Scroll>
          </Column>
          <Column>
            <Spacer></Spacer>
            <Spacer>
              <motion.div
                animate={{y: 20}}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2.0,
                }}
              >
                <Image src={Arrow}/>
              </motion.div>
            </Spacer>
            <motion.div
            animate={globePressed ? {scale: 100} : {}}
            transition={{
              duration: 3.0,
            }}
            >
              <Scroll
              onClick={handleGlobeClick} //setGlobePressed(true)}
              style={{
                boxShadow: '10px 10px darkred',
              }}
              >
                <Title
                style={{
                  color: 'purple',
                }}
                >GLOBE</Title>
                <Text>
                The GLOBE (Global Learning and Observations to Benefit the Environment) Program is an international science and education program 
                that focuses on promoting scientific literacy and building connections between people passionate about the environment.
                </Text>
              </Scroll>
            </motion.div>
            <Spacer></Spacer>
          </Column>
          <Column>
          <Scroll>
              <Title
              style={{
                color: 'purple',
              }}
              >Chemical Exposure</Title>
              <Text>
              Many of the products we use daily contain harmful substances that can seep into our bodies and ecosystems, leading to devastating impacts.
              </Text>
            </Scroll>
            <Spacer></Spacer>
            <Scroll>
              <Title
              style={{
                color: 'orange',
              }}
              >Warming</Title>
              <Text>
              The rising temperatures, melting ice caps, and extreme weather patterns we witness today are stark reminders of the climate crisis that looms over us.
              </Text>
            </Scroll>
          </Column>
          <Column>
          <Scroll>
              <Title
              style={{
                color: 'darksalmon',
              }}
              >Ozone</Title>
              <Text>
              The ozone layer acts as Earth’s protective shield, absorbing the sun's harmful ultraviolet radiation. However, human activities, such as industrial emissions and the use of ozone-depleting substances, have significantly threatened this crucial layer.
              </Text>
            </Scroll>
            <Spacer></Spacer>
            <Scroll
            style={{
              boxShadow: '10px 10px green',
            }}
            >
              <Title
              style={{
                color: 'green',
              }}
              >Agriculture</Title>
              <Text>
              The beauty of thriving farms, with their golden fields of wheat swaying in the breeze and vibrant vegetable patches bursting with color, represents the bounty of the earth and the hard work of farmers.
              </Text>
            </Scroll>
          </Column>
        </motion.div>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 3vw;
  flex-direction: row;
  overflow: hidden;
  background-color: rgb(209,201,196);
`

const Scroll = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  clip-path: polygon(20px 0px, calc(100% - 20px) 0px, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0px calc(100% - 20px), 0px 20px);
  background-color: white;
  padding: 8px;
  gap: 10px;
`

const Spacer = styled.div`
  display: flex;
  flex: 1;
`

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5vh;
`

const Text = styled.text`
  font-size: 10px;
  font-family: var(--font-pixel);
  color: black;
`

const Title = styled.text`
  font-size: 20px;
  font-family: var(--font-pixel);
  text-align: center;
`
