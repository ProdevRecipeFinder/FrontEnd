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
import { FaEnvelope } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const helpPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Help Page - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Help Page" />
      </Head>

      <Center>
        <br />
        <h1 style={{ fontSize: "1.8em" }}>Help Page</h1>
        <br />
      </Center>

      <Center>
        <Container bg="">
          <Divider />
          <br />
          <Box bg="">
            <Input
              variant="outline"
              placeholder="Search Question"
              width="60%"
              float="left"
            />
            <NextLink href="/" passHref>
              <Button float="right" leftIcon={<FaEnvelope />}>
                Contact Us
              </Button>
            </NextLink>
            <br />
          </Box>
          <br />
          <br />
          <Box
            bg=""
            maxWidth="26em"
            paddingLeft="0.3em"
            borderWidth="1"
            boxShadow="lg"
            border="1px solid black"
          >
            <Flex align="" bg="">
              <VStack align="left" bg="" w="100%">
                <h2 text-align="left">Common Questions</h2>
                <Box padding="0em 1em 1em 1em">
                  <VStack align="left" bg="">
                    <Accordion allowToggle>
                      <AccordionItem>
                        <p padding-left="0.3em" style={{ fontSize: "0.9em" }}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              How do I insert recipes into My Cookbook?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </p>
                        <AccordionPanel pb="4">
                          To add recipes to your cookbook, use these steps:
                          <br></br> 1. Ensure you are logged in.<br></br> 2. Go
                          on the recipe you want to add.<br></br>3. Click the
                          favourite toggle (heart shaped).
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <p padding-left="0.3em" style={{ fontSize: "0.9em" }}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              How do I know what recipes are vegan?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </p>
                        <AccordionPanel pb="4">
                          Go on the recipe you want and check for the V symbol.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <p padding-left="0.3em" style={{ fontSize: "0.9em" }}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              How do I find gluten-free recipes?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </p>
                        <AccordionPanel pb="4">
                          Go onto the gluten-free category.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <p padding-left="0.3em" style={{ fontSize: "0.9em" }}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              How do I find vegetarian recipes?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </p>
                        <AccordionPanel pb="4">
                          Go onto the vegetarian category.
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </VStack>
                </Box>
              </VStack>
            </Flex>
          </Box>

          <br />

          <Box
            bg=""
            width="100%"
            paddingLeft="0.3em"
            borderWidth="1"
            boxShadow="lg"
            border="1px solid black"
          >
            <Flex align="">
              <VStack align="left" bg="">
                <Box padding="1em 1em 0.5em 1em">
                  <h2 text-align="left">Help By Category</h2>
                </Box>

                <Stack direction={["column", "row"]} spacing="7em">
                  <Box paddingLeft="1em" paddingBottom="1em">
                    <VStack align="left" bg="">
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>Favourites</p>
                        </Link>
                      </NextLink>
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>My Cookbook</p>
                        </Link>
                      </NextLink>
                    </VStack>
                  </Box>

                  <Box paddingBottom="1em" paddingRight="0.2em" bg="">
                    <VStack align="left" bg="">
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>Ratings</p>
                        </Link>
                      </NextLink>
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>Dietary</p>
                        </Link>
                      </NextLink>
                    </VStack>
                  </Box>

                  <Box paddingBottom="1em" paddingRight="1em" bg="">
                    <VStack align="left" bg="">
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>Account</p>
                        </Link>
                      </NextLink>
                      <NextLink href="/" passHref>
                        <Link>
                          <p style={{ fontSize: "0.9em" }}>Errors</p>
                        </Link>
                      </NextLink>
                    </VStack>
                  </Box>
                </Stack>
              </VStack>
            </Flex>
          </Box>
        </Container>
      </Center>
    </React.Fragment>
  );
};

export default helpPage;
