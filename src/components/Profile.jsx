import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Stack,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Tag,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import profile from "../assets/profile.png";
import cover from "../assets/cover.png";
import { MdVerified } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

function Profile() {
  return (
    <>
      <Box position="relative">
        <Box h="170px" w="100%" overflow="hidden">
          <Image src={cover} roundedTop="20px" />
        </Box>
        <Box position="relative" mt="-11%" align="left">
          <Image
            ml="6%"
            src={profile}
            rounded="50%"
            border="4px"
            borderColor="whitesmoke"
            h="160px"
            w="160px"
          />
        </Box>

        <Grid templateColumns="repeat(3,1fr)">
          <GridItem colSpan={1}>
            <Box align="left" mt="15px">
              <Flex alignItems="baseline">
                <Heading fontWeight={500} mr="8px" fontFamily="Montserrat">
                  Lakshay{" "}
                </Heading>
                <MdVerified fontSize="18px" />
              </Flex>

              <Text>Blockchain Developer</Text>

              <Tag
                mt="15px"
                cursor="pointer"
                alignItems="center"
                className="grad-box"
              >
                Edit Profile <AiOutlineEdit style={{ marginLeft: "5px" }} />
              </Tag>
            </Box>
          </GridItem>
          <GridItem colSpan={2}></GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
