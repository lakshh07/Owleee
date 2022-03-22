import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import testp from "../assets/testp.png";
import CreatePost from "./CreatePost";

function PostsSection() {
  return (
    <>
      <Box>
        <CreatePost />

        <Grid
          bg="white"
          rounded="20px"
          templateColumns="repeat(3,1fr)"
          p="1em"
          boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
          mb="1em"
        >
          <GridItem colSpan={1} align="left">
            <Image src={testp} h="100%" w="90%" />
          </GridItem>
          <GridItem colSpan={2}>
            <Box mr="10px">
              <Text textAlign="justify">
                What are the 3 essential skills that are critical in the 21st
                century? School cancelled? What to do? Have some young ones that
                you need to home school?
              </Text>

              <Flex alignItems="center">
                <Box py="5px" px="10px" className="grad-box" rounded="10px">
                  <Text fontWeight={500}>May</Text>
                  <Text fontWeight={700}>09</Text>
                </Box>
                <Flex mt="20px" alignItems="center">
                  <Avatar size="xs" />
                  <Text fontWeight={600} ml="10px">
                    Angelina Joly
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
        </Grid>
      </Box>
    </>
  );
}

export default PostsSection;
