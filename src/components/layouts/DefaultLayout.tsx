import React from "react"
import NavigationBar from "../NavigationBar/NavigationBar"

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      { children }
    </React.Fragment>
  )
};

export default DefaultLayout