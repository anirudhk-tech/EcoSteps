import Image from "next/image";
import styled from "styled-components";
import Diamond from '../../public/web assets/diamond.png';
import Topaz from '../../public/web assets/topaz.png';
import Ruby from '../../public/web assets/ruby.png';
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export const TaskBar = ({ desc, badge_number, setCompleted }) => {
    const [email, setEmail] = useState(null);
    const [MouseEnter, setMouseEnter] = useState(false);
    const [error, setError] = useState(null);

    const Badge = badge_number % 3 == 1 ? 
                    Diamond : badge_number % 3 == 2 ?
                        Ruby : Topaz

    useEffect(() => {
        const user = async () => {
          const supabase = createClient();
          const { data, error } = await supabase.auth.getUser();
          if (error || !data?.user) {
            router.push('/signin');
            return;
          }
          setEmail(data.user.email);
        }
        user();
      }, []);
    
      const completeTask = async (id) => {
        try {
          const response = await fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
          });
          if (!response.ok) {
            throw new Error('Failed to complete task');
          }
          console.log("Task completed successfully");
        } catch (err) {
          setError(err.message);
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
        >
            <Bar
            onClick={() => {
                completeTask(badge_number)
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