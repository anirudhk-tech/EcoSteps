import { motion } from "framer-motion";
import Image from "next/image";
import Potteri from '../../public/web assets/potteri.png';
import styled from "styled-components";

export const PotteriLogo = ({ marginTop }) => {
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
                src={Potteri}
                style={{
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                }}
            />
            <StoreName>Potteri</StoreName>
        </motion.div>
    )
}

const StoreName = styled.text`
    font-family: var(--font-pixel);
    font-size: 25px;
    color: white;
`