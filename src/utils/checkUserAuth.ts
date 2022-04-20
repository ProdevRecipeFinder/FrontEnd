import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StdUserFragment, User, useWhoAmIQuery, WhoAmIDocument } from "../generated/graphql";
import { initializeApollo } from "./apollo";

export const checkUserAuth = async () => {
    const router = useRouter();
    const apolloClient = initializeApollo();
    useEffect(() => {
        const userStatus = async () => {
            const { data: authorized } = await apolloClient.query({
                query: WhoAmIDocument
            })
            if (!authorized.whoami.id) {
                router.replace("/login?next=" + router.pathname);
            }
        }
        userStatus();
    }, [router]);
}