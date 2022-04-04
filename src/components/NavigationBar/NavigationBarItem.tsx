import type { IconDefinition }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { Button }               from "@chakra-ui/react"
import NextLink                 from "next/link"
import styles                   from "./NavigationBar.module.css"
import React                    from "react"

interface Props {
  href: string,
  text: string,
  icon: IconDefinition,
  onClick?: () => void
}

const NavigationBarItem = (props: Props) => {
  return (
    <NextLink href={props.href}>
      <Button onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} className={styles.navMenuItemIcon} />
        {props.text}
      </Button>
    </NextLink>
  )
}

export default NavigationBarItem