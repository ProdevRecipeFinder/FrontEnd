import { initializeApollo } from "./apollo"
import { WhoAmIDocument }   from "../generated/graphql"
import { useEffect }        from "react"
import { useRouter }        from "next/router"

export const checkUserAuth = async () => {
  const apolloClient = initializeApollo()
  const router = useRouter()

  useEffect(() => {
    const userStatus = async () => {
      const { data: authorized } = await apolloClient.query({
        query: WhoAmIDocument,
      })
      if (!authorized.whoami.id)
        router.replace("/login?next=" + router.pathname)
    }
    userStatus()
  }, [router])
};
