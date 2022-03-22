import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import testp from "../assets/testp.png";
import { MdOutlinePeople, MdSend } from "react-icons/md";

function LiveStreaming() {
  return (
    <>
      <Heading
        fontSize="1.5em"
        mt="1em"
        textAlign="center"
        fontFamily="Montserrat"
        fontWeight={500}
        // className="h-shadow"
      >
        Live Streaming
      </Heading>
      <Box
        align="center"
        position="relative"
        mt="1em"
        w="85%"
        h="78%"
        mx="auto"
        bg="white"
        rounded="25px"
        // boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
        boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
      >
        <Image src={testp} borderTopRadius="25px" />
        <Box
          position="relative"
          bg="#3764E5"
          w="60%"
          mt="-0.4em"
          top="-3%"
          mx="auto"
          rounded="10px"
          align="left"
          color="white"
          fontSize="14px"
          px="0.8em"
          py="0.5em"
        >
          <Text fontWeight={700}>Live Chat</Text>
          <Flex alignItems="center">
            <MdOutlinePeople />
            <Text ml="5px">1.3k Peoples</Text>
          </Flex>
        </Box>

        <Box></Box>
        <Flex
          position="absolute"
          className="grad-box"
          w="100%"
          borderBottomRadius="25px"
          bottom="0"
          px="0.7em"
          justifyContent="space-between"
          alignItems="center"
        >
          <InputGroup bg="transparent" className="b">
            <InputLeftElement children={"😃"} cursor="pointer" />
            <Input
              type="text"
              border="none"
              color="white"
              w="90%"
              placeholder="Add Comment"
              _focus={{ border: "none" }}
            />
            <InputRightElement
              cursor="pointer"
              children={<MdSend color="gray.300" />}
            />
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}

export default LiveStreaming;
