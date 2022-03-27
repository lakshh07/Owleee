import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import profile from "../assets/profile.png";
import unnamed from "../assets/unnamed.png";

function Friends() {
  return (
    <>
      <Box mt="2em">
        <Text
          ml="1.5em"
          textTransform="uppercase"
          color="gray"
          fontWeight={700}
        >
          Friends
        </Text>
        <Stack
          ml="1.5em"
          mt="1em"
          alignItems="flex-start"
          spacing="10px"
          w="100%"
        >
          <Flex w="100%" alignItems="center" justifyContent="flex-start">
            <Flex alignItems="center" justifyContent="space-around">
              <Box
                rounded="full"
                mt="5px"
                ml="5px"
                h="40px"
                w="40px"
                overflow="hidden"
              >
                <Image
                  className="h-shadow-2"
                  src={profile}
                  borderRadius="full"
                  border="2px"
                  color="#0070F3"
                />
              </Box>
              <Text fontSize="18px" fontWeight={500} ml="12px">
                Lakshay Maini
              </Text>
            </Flex>
            <Box>
              <Box
                ml="3.5em"
                bg="green"
                h="10px"
                w="10px"
                borderRadius="50%"
              ></Box>
            </Box>
          </Flex>
          <Flex
            // w="100%"
            ml="1.5em"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Flex alignItems="center" justifyContent="space-around">
              <Box
                rounded="full"
                mt="5px"
                ml="5px"
                h="40px"
                w="40px"
                overflow="hidden"
              >
                <Image
                  className="h-shadow-2"
                  src={unnamed}
                  borderRadius="full"
                  border="2px"
                  color="#0070F3"
                />
              </Box>
              <Text fontSize="18px" fontWeight={500} ml="12px">
                Maeve Willey
              </Text>
            </Flex>
            <Box>
              <Box
                ml="3.5em"
                bg="green"
                h="10px"
                w="10px"
                borderRadius="50%"
              ></Box>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}

export default Friends;
