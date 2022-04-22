import type { IconDefinition }  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { Button, Center }       from "@chakra-ui/react"
import NextLink                 from "next/link"
import useURL                   from "../../hooks/useURL"
import styles                   from "./NavigationBar.module.css"
import React                    from "react"

interface Props {
  icon: IconDefinition
  onClick?: () => void
  href: string
  text: string
}

const NavigationBarItem = (props: Props) => {
  const isURLEqual = useURL({ url: props.href })

  return (
    <React.Fragment>
      <Center>
        <NextLink href={props.href}>
          <Button w={isURLEqual ? "95%" : "100%"} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} className={styles.navMenuItemIcon} />
            <p>{props.text}</p>
          </Button>
        </NextLink>
      </Center>
    </React.Fragment>
  )
}

export default NavigationBarItem