import Image from "next/image";
import styled from "styled-components";
import Diamond from '../../public/web assets/diamond.png';
import Topaz from '../../public/web assets/topaz.png';
import Ruby from '../../public/web assets/ruby.png';
import { motion } from "framer-motion";
import { useState } from "react";

export const TaskBar = ({ desc, badge_number, setCompleted }) => {
    const [MouseEnter, setMouseEnter] = useState(false);

    const Badge = badge_number % 3 == 1 ? 
                    Diamond : badge_number % 3 == 2 ?
                        Ruby : Topaz
    
    const CompleteTask = async (id) => {
        try {
            await fetch(`http://localhost:4000/tasks/${id}`, {
                method: 'POST',
            })
            
        } catch (error) {
            console.log("Error occurred while completing task: ", error);
        }
    } 

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
        role='button'
        >
            <Bar
            onClick={() => {
                CompleteTask(badge_number)
                setCompleted(badge_number)
            }}
            >
                <Image src={Badge} style={{height: '1vh', width: '1vw', scale: 20, marginLeft: '4vw', marginBottom: '2vh'}}/>
                <BarText>{MouseEnter ? "Complete?" : desc}</BarText>
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