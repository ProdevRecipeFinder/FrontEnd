import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWhoAmIQuery } from "../generated/graphql";

export const checkUserAuth = () => {
    const { data: userData, loading: isLoading } = useWhoAmIQuery();
    const router = useRouter();
    useEffect(() => {
        if (!isLoading && !userData?.whoami?.id) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [isLoading, userData, router]);
}