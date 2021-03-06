import type { NextPage }  from 'next'
import { useRouter }      from "next/router"
import { useEffect }      from "react"
import { Box }            from "@chakra-ui/react"

const NotFound: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }, [])

  return (
    <Box textAlign="center">
      <h1 id="title" style={{ fontSize: "4em" }}>Opps... 404 :(</h1>
      <br />
      <p>That page cannot be found. Redirecting in 3 seconds...</p>
    </Box>
  )
};

export default NotFound