import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import testp from "../assets/testp.png";
import profile from "../assets/profile.png";
import CreatePost from "./CreatePost";
import { MdVerified } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineFire, AiOutlineComment } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import getPublications from "../helpers/getPosts";
import { timeline } from "../helpers/user-timeline";
import polygon from "../assets/polygon-logo.svg";

function PostsSection() {
  const [postData, setPostData] = useState([]);
  const Month = ["Jan", "Feb", "March", "April"];

  useEffect(async () => {
    const postResponse = await timeline();
    postResponse && setPostData(postResponse);
  }, [postData]);

  function getDate(date) {
    const d = new Date(date);
    return d;
  }
  return (
    <>
      <Box>
        {postData.map((list, index) => {
          return (
            <Box
              mx="4%"
              bg="white"
              rounded="20px"
              templateColumns="repeat(3,1fr)"
              p="1em"
              boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
              mb="1em"
              key={index}
            >
              <Flex>
                <Box
                  rounded="full"
                  mt="5px"
                  ml="5px"
                  h="80px"
                  w="80px"
                  overflow="hidden"
                >
                  <Image
                    className="h-shadow-2"
                    src={`https://ipfs.io/ipfs/${list.profile.coverPicture.original.url}`}
                    borderRadius="full"
                    border="2px"
                    color="#0070F3"
                  />
                </Box>
                <Box ml="15px" align="center" w="100%">
                  <Box ml="1%" mt="1%">
                    <Flex alignItems="center">
                      <Text
                        className="h-shadow-2"
                        fontWeight={700}
                        fontSize="19px"
                        align="left"
                        mr="5px"
                        textTransform="capitalize"
                      >
                        {/* list.profile.coverPicture.original.url */}
                        {list.profile.name}
                      </Text>
                      <MdVerified fontSize="18px" />
                      <Tag ml="10px" className="grad-box">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(list.createdAt))}{" "}
                        {getDate(list.createdAt).getDate()},{" "}
                        {getDate(list.createdAt).getFullYear()}
                      </Tag>
                    </Flex>
                    <Text mt="5px" fontSize="17px" align="left">
                      {list.metadata.content}
                    </Text>
                  </Box>

                  <Flex justifyContent="center" p="2em 2em 2em 0.9em" mr="50px">
                    {list.metadata.description !=
                      "Checking that publishing post working!" &&
                      list.metadata.description != "description" &&
                      list.metadata.description.length > 13 && (
                        <Image
                          boxShadow="rgba(149, 157, 165, 0.3) 0px 8px 24px"
                          borderRadius="10px"
                          src={`https://ipfs.io/ipfs/${list.metadata.description}`}
                        />
                      )}
                  </Flex>

                  <Flex
                    mt={
                      list.metadata.description !=
                        "Checking that publishing post working!" &&
                      list.metadata.description != "description" &&
                      list.metadata.description.length > 13
                        ? "-5px"
                        : "-2.5em"
                    }
                    mb="5px"
                    mr="7em"
                    ml="3em"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      bg="transparent"
                      alignItems="center"
                      fontSize="20px"
                      fontWeight={500}
                      leftIcon={<AiOutlineFire />}
                    >
                      32
                    </Button>
                    <Button
                      bg="transparent"
                      alignItems="center"
                      fontSize="20px"
                      fontWeight={500}
                      leftIcon={<AiOutlineComment />}
                    >
                      12
                    </Button>
                    <Button
                      bg="transparent"
                      alignItems="center"
                      fontSize="17px"
                      fontWeight={500}
                      leftIcon={<BsCurrencyExchange />}
                    >
                      Tip
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          );
        })}

        {/* <Grid
              bg="white"
              rounded="20px"
              templateColumns="repeat(3,1fr)"
              p="1em"
              boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
              mb="1em"
              key={index}
            >
              <GridItem colSpan={1} align="left">
                <Image src={testp} h="100%" w="90%" />
              </GridItem>
              <GridItem colSpan={2}>
                <Box mr="10px">
                  <Text textAlign="justify">{list.metadata.content}</Text>

                  <Flex alignItems="center">
                    <Box py="5px" px="10px" className="grad-box" rounded="10px">
                      <Text fontWeight={400}>
                        {getDate(list.createdAt).getFullYear()}
                      </Text>
                      <Text fontWeight={500}>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(list.createdAt))}
                      </Text>
                      <Text fontWeight={700}>
                        {getDate(list.createdAt).getDate()}
                      </Text>
                    </Box>
                    <Flex mt="20px" alignItems="center">
                      <Avatar size="xs" />
                      <Text
                        fontWeight={600}
                        ml="10px"
                        textTransform="capitalize"
                      >
                        {list.profile.name}
                      </Text>
                    </Flex>
                    <Tag>Tip</Tag>
                  </Flex>

                  <Flex
                    mt="20px"
                    mx="2em"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex>
                      <Flex alignItems="center">
                        🔥
                        <Text ml="5px" fontSize="18px" fontWeight={500}>
                          12
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </GridItem>
            </Grid> */}
      </Box>
    </>
  );
}

export default PostsSection;
