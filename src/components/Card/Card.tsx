import { Box, useBreakpointValue }  from '@chakra-ui/react'
import { faHeartCircleCheck }       from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome'
import { truncateString }           from "../../utils/truncString"
import styles                       from "./Card.module.scss"
import React                        from "react"

interface Props {
  showHeart?: boolean
  title: string
  rating: string
  img: string,
  maxWidth: number
  height: number
}

const Card = ({title, rating, img, showHeart, maxWidth, height}: Props) => {
  return (
    <React.Fragment>
      <Box className={styles.card} maxWidth={useBreakpointValue({base: `${maxWidth/1.6}px`, md: `${maxWidth}px`})} height={useBreakpointValue({base: `${height/1.125}px`, md: `${height}px`})}>
        
        <Box className={styles.card_img} height={useBreakpointValue({base: `${height/1.125}px`, md: `${height}px`})}>
          <img src={img} className={styles.img} />
          {
            !showHeart ? null :
            <Box className={styles.card_heart}>
              <FontAwesomeIcon icon={faHeartCircleCheck} fontSize="2em"/>
            </Box>
          }
        </Box>

        <Box className={styles.card_text} >
          <Box className={styles.card_title}>
            <h3>{truncateString(title, 30)}</h3>
          </Box>
          <p>
            {rating}
          </p>
        </Box>

      </Box>
    </React.Fragment>
  )
}

export default Card