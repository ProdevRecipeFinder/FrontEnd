import { useState, useEffect } from "react"
import { useRouter } from "next/router"

interface Props {
  url: string
}

const useURL = ({url}: Props) => {
  const [isEqual, setIsEqual] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsEqual(router.pathname === url)
  }, [router.pathname, url])

  return isEqual
}

export default useURL