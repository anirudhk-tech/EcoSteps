import Image from "next/image";
import styled from "styled-components";
import Diamond from '../../public/web assets/diamond.png';
import Topaz from '../../public/web assets/topaz.png';
import Ruby from '../../public/web assets/ruby.png';
import { motion } from "framer-motion";
import { useState } from "react";

export const TaskBar = ({ desc, badge_number, setState }) => {
    const [MouseEnter, setMouseEnter] = useState(false);

    const Badge = badge_number == 1 ? 
                    Diamond : badge_number == 2 ?
                        Ruby : Topaz
    return (
        <motion.div
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        whileHover={{opacity: 0.0}}
        transition={{
            duration: '0.5',
            repeat: MouseEnter ? 0 : Infinity,
            repeatType: 'reverse',
        }}
        style={{
            display: 'flex',
            flex: 1,
        }}
        >
            <Bar>
                <Image src={Badge} style={{height: '1vh', width: '1vw', scale: 20, marginLeft: '4vw', marginBottom: '2vh'}}/>
                <BarText>{desc}</BarText>
            </Bar>
        </motion.div>
    )
};

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    border: 2px solid black;
    gap: 2vw;
    align-items: center;
    text-vertical: center;
`

const BarText = styled.text`
    font-size: 20px;
    font-family: var(--font-pixel);
    color: black;
`