import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@chakra-ui/react"
import NextLink from "next/link"
import styles from "./NavigationBar.module.css"

interface Props {
  href: string,
  text: string,
  icon: IconDefinition
}

const NavigationBarItem = (props: Props) => {
  return (
    <NextLink href={props.href}>
      <Button>
        <FontAwesomeIcon icon={props.icon} className={styles.navMenuItemIcon} />
        {props.text}
      </Button>
    </NextLink>
  )
}

export default NavigationBarItem