import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@chakra-ui/react"
import NextLink from "next/link"
import styles from "./NavigationBar.module.css"

interface NavigationBarItemProps {
  href: string,
  text: string,
  icon: IconDefinition
}

const NavigationBarItem = (props: NavigationBarItemProps) => {
  return (
    <React.Fragment>
      <Button>
        <FontAwesomeIcon icon={props.icon} className={styles.navMenuItemIcon} />
        <NextLink href={props.href}>{props.text}</NextLink>
      </Button>
    </React.Fragment>
  )
}

export default NavigationBarItem