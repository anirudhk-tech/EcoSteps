import { motion } from "framer-motion";
import Image from "next/image";
import EcoCoin from '../../public/web assets/ecoCoin.png';

export const EcoLogo = ({ marginTop }) => {
    return(
        <motion.div
        animate={{y: 10}}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2.0,
        }}
        >
            <Image 
                src={EcoCoin}
                style={{
                    position: 'absolute',
                    width: '7vw',
                    height: '15vh',
                    scale: 3,
                    marginTop: marginTop,
                }}
            />
        </motion.div>
    )
}