import {
  Button,
  Center,
  Stack,
  Image,
  Link,
  Input,
  SimpleGrid,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";
import InputField from "../components/InputField";
import NextLink from "next/link";
import Head from "next/head";

const helpPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Help Page - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Help Page" />
      </Head>

      <Center>
        <h1 style={{ fontSize: "1.8em" }}>Help Page</h1>
        <br />
        <Box>
          <Input
            variant="outline"
            placeholder="Search Question"
            width="26em"
            float="left"
          />

          <Button float="right">Contact Us</Button>
          <Box>
            <h2>Common Questions</h2>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  );
};

export default helpPage;
