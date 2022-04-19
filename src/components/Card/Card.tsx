import React from "react";
import { Box } from '@chakra-ui/react';
import styles from "./Card.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { truncateString } from "../../utils/truncString"

interface Props {
  title: string
  desc: string
  img: string
}

const card = ({title, desc, img}: Props) => {
  return (
    <React.Fragment>
      <Box className={styles.card}>
        
        <Box className={styles.card_img}>
          <img src={img} className={styles.img} />
          <Box className={styles.card_heart}>
            <FontAwesomeIcon icon={faHeartCircleCheck} fontSize="2em"/>
          </Box>
        </Box>

        <Box className={styles.card_text}>
          <Box className={styles.card_title}>
            <h3>{truncateString(title, 30)}</h3>
          </Box>
          <p>
            {truncateString(desc, 100)}
          </p>
        </Box>

      </Box>
    </React.Fragment>
  )
}

export default card;