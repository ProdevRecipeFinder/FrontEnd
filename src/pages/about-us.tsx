import {
  Button,
  Center,
  Link,
  Input,
  Flex,
  Box,
  Container,
  VStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";

const aboutUsPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us Page - Recipe Finder</title>
        <meta name="description" content="Recipe Finder About Us Page" />
      </Head>

      <Center>
        <br />
        <h1 style={{ fontSize: "1.8em" }}>About Recipe Finder</h1>
        <br />
      </Center>

      <Container>
        <br />
        <Divider borderBottomWidth="3px" borderColor="#D17B69" />
        <h2 style={{ paddingBottom: ".5em", fontSize: "1.3em" }}>Who We Are</h2>
        <p>
          Recipe Finder is a new, fresh way of finding, cooking and storing
          delicious meals on the internet. We offer a wide variety of recipes,
          meticulously designed to help even the most amateur cooks.
        </p>
        <p style={{ paddingTop: ".5em" }}>
          Recipe Finder was founded in 2022 by 5 students studying at The
          Manchester Metropolitan University. A chosen project, as part of their
          Professional Development unit in 2nd year.
        </p>
        <br />
        <h2 style={{ paddingBottom: ".5em", fontSize: "1.3em" }}>
          Technologies
        </h2>
        <p>
          The tech-stack we used for this project consists of TypeScript,
          ReactJS, NextJS, GraphQL Apollo Client, PostgresSQL, GraphQL Apollo
          Server and TypeORM. We also used various component libraries, as well
          as APIs.
        </p>
        <br />
        <h2 style={{ paddingBottom: ".5em", fontSize: "1.3em" }}>
          Meet the Team
        </h2>
        <p>
          Leyton O'Day
          <br></br>
          Gergo Nemeth
          <br></br>
          Aaron Kyungu
          <br></br>
          Mohamed Madi
          <br></br>
          Saqib Rahman
          <br></br>
          Abdulla Fakhroo
        </p>
      </Container>
    </React.Fragment>
  );
};
export default aboutUsPage;
