import React from "react"
import NavigationBar from "./NavigationBar/NavigationBar"

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      { children }
    </React.Fragment>
  )
};

export default Layout