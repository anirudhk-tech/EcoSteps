import { motion } from "framer-motion";
import Image from "next/image";
import Daisy from '../../public/web assets/daisyStore.png';
import styled from "styled-components";

export const DaisyLogo = ({ marginTop }) => {
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
                src={Daisy}
                style={{
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                }}
            />
            <StoreName>Daisy Store</StoreName>
        </motion.div>
    )
}

const StoreName = styled.text`
    font-family: var(--font-pixel);
    font-size: 25px;
    color: white;
`