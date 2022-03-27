import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Stack,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import Avatar from "@davatar/react";
import truncateMiddle from "truncate-middle";
import { ethers } from "ethers";

import OwleeeForum from "../artifacts/contracts/OwleeeForum.sol/OwleeeForum.json";
import contractAddress from "../contract_address.json";
import { set } from "lodash";

function Forum({ accountData }) {
  const [message, setMessage] = useState("");
  const [forumData, setForumData] = useState();
  const [success, setSuccess] = useState(false);
  const [checker, setChecker] = useState(false);
  const toast = useToast();

  useEffect(() => {
    success &&
      toast({
        title: "Success",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
  }, [success]);

  async function postComment() {
    if (accountData) {
      setChecker(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress.OwleeeForumAddress,
        OwleeeForum.abi,
        signer
      );

      let overrides = {
        from: accountData.address,
      };

      const result = await contract.addComment("owleee", message, overrides);
      console.log(result.hash);
      setChecker(false);
      setSuccess(true);
    }
  }

  async function fetchData() {
    // if (accountData) {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress.OwleeeForumAddress,
      OwleeeForum.abi,
      provider
    );

    let overrides = {
      from: account,
    };

    const filesData = await contract.getComments("owleee", overrides);
    setForumData(filesData);
    console.log("Data: ", filesData);

    // setBalance(balance.toString());
    // setShowBalance(true);
    return filesData;
    // }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Text
        mt="1em"
        ml="1.5em"
        textTransform="uppercase"
        color="gray"
        fontSize="18px"
        fontWeight={700}
        textAlign="left"
        mb="1em"
      >
        OWleee Community discussions
      </Text>
      {forumData &&
        forumData.map((list, index) => {
          return (
            <Box
              mx="4%"
              bg="white"
              rounded="20px"
              boxShadow="rgba(149, 157, 165, 0.1 ) 0px 8px 24px"
              mb="1em"
              p="1em"
              key={index}
            >
              <HStack spacing={3} align="start">
                <Avatar pt="10px" size={48} address={list.creator_address} />
                <Stack
                  spacing={1}
                  align="start"
                  flex={1}
                  bg="whiteAlpha.100"
                  rounded="2xl"
                >
                  <Heading color="BlackAlpha.900" fontSize="lg">
                    <Text display="inline">
                      {truncateMiddle(list.creator_address || "", 5, 4, "...")}
                    </Text>
                  </Heading>
                  <Text color="BlackAlpha.800" fontSize="lg">
                    {list.message}
                  </Text>
                  <Text color="BlackAlpha.500" fontSize="md">
                    <TimeAgo date={list.created_at.toNumber() * 1000} />
                  </Text>
                </Stack>
              </HStack>
            </Box>
          );
        })}

      {/*``````````````````````````````community editior`````````````````````````` */}
      <Box
        mx="4%"
        bg="white"
        rounded="20px"
        boxShadow="rgba(149, 157, 165, 0.1 ) 0px 8px 24px"
        mb="1em"
        px="1em"
        pt="0.5em"
        pb="1em"
      >
        <Stack spacing={3} mt="2em">
          <HStack spacing={3} alignItems="start">
            <Avatar size={48} address={accountData && accountData.address} />
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message.."
              p={3}
              flex={1}
              bg="blackAlpha.100"
              rounded="2xl"
              fontSize="lg"
            />
          </HStack>
          <Button
            size="sm"
            bg="#3764E5"
            color="white"
            colorScheme="pink"
            alignSelf="flex-end"
            onClick={postComment}
            // onClick={() => {
            //   mutation
            //     .mutateAsync({
            //       message,
            //       topic,
            //     })
            //     .then(() => setMessage(""));
            // }}
            isLoading={checker}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Forum;
