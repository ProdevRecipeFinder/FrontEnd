import NavigationBar  from "../NavigationBar/NavigationBar"
import React          from "react"

interface Props {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="container">
        {children}
      </div>
    </React.Fragment>
  )
}

export default DefaultLayout