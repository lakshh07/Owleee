import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";

import { Framework } from "@superfluid-finance/sdk-core";
import { Web3Provider } from "@ethersproject/providers";

function JoinTier() {
  const testFlow = async () => {
    const sf = await Framework.create({
      networkName: "mumbai",
      provider: new Web3Provider(window.ethereum),
    });

    const signer = sf.createSigner({
      privateKey:
        "0x137e99faa9dc8efdbec1516a2914e79d070f92970e7a2eae8db859d9324e7230",
      provider: new Web3Provider(window.ethereum),
    });

    const DAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: "385802469135802",
        receiver: "0x3bc842B060066802B48834EcC2ec127589caF94E",
        superToken: DAIx,
        // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      alert("Joined Successfully!! 🎉🎉🎉");

      console.log(
        `Congrats - you've just created a money stream!
          View Your Stream At: https://app.superfluid.finance/dashboard/
          Network: mumbai
          Super Token: DAIx
          Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
          Receiver: ,
          FlowRate: "385802469135802"
          `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    // testFlow();
  }, []);

  return (
    <>
      <Box my="5em" align="center">
        <Heading fontSize="25px" fontFamily="Raleway">
          Select a membership level
        </Heading>
        <Flex justifyContent="space-evenly" mx="9%" mt="4em">
          <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: "center", lg: "flex-start" }}
            borderColor={useColorModeValue("gray.200", "gray.500")}
            borderRadius={"xl"}
          >
            <Stack
              textAlign="center"
              justify="center"
              spacing={{ base: 4, lg: 10 }}
            >
              <Box py={4} px={12} position="relative">
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                  <Text
                    textTransform="uppercase"
                    bg="#0177ff8c"
                    px={3.5}
                    py={1.5}
                    color="black"
                    fontSize="xl"
                    fontWeight="600"
                    rounded="xl"
                    letterSpacing="2px"
                  >
                    Silver
                  </Text>
                </Box>
                <HStack pt="1.4em" justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    5
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={2}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Earn 20.0 ASM per month
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Exclusive Owleee-Only content
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Unlock Key to access Silver content
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    onClick={alert("Joined Successfully!! 🎉🎉🎉")}
                  >
                    Join
                  </Button>
                </Box>
              </VStack>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default JoinTier;
