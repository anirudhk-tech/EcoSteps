import Image from "next/image";
import styled from "styled-components";
import Cloud from '../../public/badges/cloudBadge.png';
import Arcade from '../../public/badges/ArcadeBadge.png';
import Galaxy from '../../public/badges/galaxyBadge.png';
import { motion } from "framer-motion";
import { useState } from "react";

export const BadgeBar = ({ badge_name, badge_number }) => {
    const [MouseEnter, setMouseEnter] = useState(false);

    const Badge = badge_number == 1 ? 
                    Cloud : badge_number == 2 ?
                        Arcade : Galaxy
    return (
        <motion.div
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        whileHover={{scale: 1.03}}
        transition={{
            duration: '0.5',
        }}
        style={{
            display: 'flex',
            flex: 1,
        }}
        >
            <Bar>
                <motion.div
                animate={MouseEnter ? {scale: [1.3, 1]} : {}}
                transition={{
                    duration: 1.0,
                    repeat: MouseEnter ? Infinity : 0,
                    repeatType: 'loop'
                }}
                >
                    <Image src={Badge} style={{height: '1vh', width: '1vw', scale: 16, marginLeft: '4.5vw'}}/>
                </motion.div>
                <BarText>{badge_name}</BarText>
            </Bar>
        </motion.div>
    )
};

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    border: 2px solid black;
    justify-content: space-between;
    align-items: center;
    text-vertical: center;
    padding-left: 5px;
    padding-right: 5px;
`

const BarText = styled.text`
    font-size: 30px;
    font-family: var(--font-pixel);
    color: black;
`