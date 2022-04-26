import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { truncateString } from "../../utils/truncString"
import { Box } from '@chakra-ui/react'
import styles from "./Card.module.scss"
import React from "react"
import { RecipeCardVariant } from "../Recipe/RecipeCard"

interface Props {
  showHeart?: boolean
  title: string
  desc: string
  img: string
  variant?: RecipeCardVariant
}

const Card = ({ title, desc, img, showHeart, variant }: Props) => {
  return (
    <React.Fragment>
      <Box className={styles.card}>
        {/* className={variant === "x-small" ? styles.card_xs : variant === "small" ? styles.card_small : styles.card} */}



        <Box className={styles.card_img}>
          <img src={img} className={styles.img} />
          {
            !showHeart ? null :
              <Box className={styles.card_heart}>
                <FontAwesomeIcon icon={faHeartCircleCheck} fontSize="2em" />
              </Box>
          }
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

export default Card