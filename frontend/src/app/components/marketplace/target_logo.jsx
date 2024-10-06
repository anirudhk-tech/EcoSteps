import { motion } from "framer-motion";
import Image from "next/image";
import Target from '../../public/web assets/target.png';
import styled from "styled-components";

export const TargetLogo = ({ marginTop }) => {
    return(
        <motion.div
        animate={{y: 10}}
        style={{
            gap: '20px',
            flexDirection: 'row',
            display: 'flex',
            flex: 1,
            position: 'absolute',
            alignItems: 'center',
            marginTop: marginTop,
        }}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2.0,
        }}
        >
            <Image 
                src={Target}
                style={{
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                }}
            />
            <StoreName>Target</StoreName>
        </motion.div>
    )
}

const StoreName = styled.text`
    font-family: var(--font-pixel);
    font-size: 25px;
    color: white;
`