import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Tag,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import cover from "../assets/cover.png";
import { MdVerified } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineFire, AiOutlineComment } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import UserProfile from "./UpdateProfile";
import { profiles } from "../helpers/getProfile";

import { ethers } from "ethers";

import CreatePost from "./CreatePost";

import getPublications from "../helpers/getPosts";

import OwleeeTip from "../artifacts/contracts/OwleeeTip.sol/OwleeeTip.json";
import contractAddress from "../contract_address.json";
import JoinTier from "./JoinTier";

function Profile() {
  const toast = useToast();
  const [profileData, setProfileData] = useState();
  const [postData, setPostData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checker, setChecker] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tip, setTip] = useState("0");

  useEffect(async () => {
    const profileResponse = await profiles();
    profileResponse && setProfileData(profileResponse);
    console.log(profileResponse.coverPicture);
  }, [profileData]);

  useEffect(async () => {
    const postResponse = await getPublications();
    postResponse && setPostData(postResponse);
    console.log(postResponse[0]);
  }, [postData]);

  function getDate(date) {
    const d = new Date(date);
    return d;
  }

  async function fetchTipData() {
    // if (accountData) {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress.OwleeeTipAddress,
      OwleeeTip.abi,
      provider
    );

    let overrides = {
      from: account,
    };

    const filesData = await contract.totalTip();
    // setForumData(filesData);
    console.log("Data: ", ethers.utils.formatEther(filesData.toString()));
    setTip(filesData);
    // setBalance(balance.toString());
    // setShowBalance(true);
    return filesData;
    // }
  }
  useEffect(() => {
    success &&
      toast({
        title: "Success",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
  }, [success]);

  async function getTip() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress.OwleeeTipAddress,
      OwleeeTip.abi,
      signer
    );

    let overrides = {
      from: account,
      value: "100000000000000000",
    };

    const result = await contract.sendTip(
      postData[0].profile.ownedBy,
      overrides
    );
    console.log(result.hash);
    setSuccess(true);
  }

  useEffect(() => {
    fetchTipData();
  }, []);

  return (
    <>
      <Box position="relative">
        <Box h="170px" w="100%" overflow="hidden">
          <Image src={cover} roundedTop="20px" />
        </Box>
        <Box position="relative" mt="-11%" align="left">
          <Image
            ml="6%"
            // src={profile}
            // src={`https://ipfs.io/ipfs/${profileData.coverPicture.original.url}`}
            src={`https://ipfs.io/ipfs/${
              postData && postData[0].profile.coverPicture.original.url
            }`}
            rounded="50%"
            border="4px"
            borderColor="whitesmoke"
            h="160px"
            w="160px"
          />
        </Box>

        {/* <Grid templateColumns="repeat(3,1fr)">
          <GridItem colSpan={1}> */}
        <Box align="left" mt="15px">
          <Flex justifyContent="space-between" mr="8px" alignItems="center">
            <Box>
              <Flex alignItems="baseline">
                <Heading
                  fontWeight={500}
                  fontFamily="Montserrat"
                  textTransform="capitalize"
                  fontSize="32px"
                >
                  {profileData && profileData[0].name}
                </Heading>
                <MdVerified fontSize="18px" />
              </Flex>

              <Text>{profileData && profileData[0].bio}</Text>

              <Flex mt="10px" ml="10px" justifyContent="space-evenly">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mr="10px"
                >
                  <Text fontWeight={700}>1</Text>
                  <Text fontSize="14px" fontWeight={500}>
                    Following
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mr="10px"
                >
                  <Text fontWeight={700}>6</Text>
                  <Text fontSize="14px" fontWeight={500}>
                    Owleee Users
                  </Text>
                </Flex>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Text fontWeight={700}>0</Text>
                  <Text fontSize="14px" fontWeight={500}>
                    Followers
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box align="center">
              <Flex>
                <Text>Tip Received: </Text>
                <Text fontWeight={600}>
                  &nbsp;{tip > 0 && ethers.utils.formatEther(tip.toString())}{" "}
                  Matic
                </Text>
              </Flex>
              <Tag
                mt="15px"
                cursor="pointer"
                alignItems="center"
                className="grad-box"
                onClick={onOpen}
              >
                Edit Profile <AiOutlineEdit style={{ marginLeft: "5px" }} />
              </Tag>
              <UserProfile isOpen={isOpen} onClose={onClose} />
            </Box>
          </Flex>
        </Box>
        <Box mt="2em">
          <CreatePost />
          {/* <JoinTier /> */}
          <Text
            mt="3em"
            ml="1.5em"
            textTransform="uppercase"
            color="gray"
            fontSize="18px"
            fontWeight={700}
            textAlign="left"
            mb="1em"
          >
            All Posts
          </Text>

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
                      </Box>

                      <Box position="relative">
                        {/* <Box className="lock">
                          <Text
                            mt="10%"
                            textDecoration="underline"
                            fontWeight={700}
                            fontSize="18px"
                          >
                            Content Locked
                          </Text>
                        </Box> */}
                        <Text ml="1%" mt="5px" fontSize="17px" align="left">
                          {list.metadata.content}
                        </Text>

                        <Flex
                          justifyContent="center"
                          p="2em 2em 2em 0.9em"
                          mr="50px"
                        >
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
                            onClick={getTip}
                          >
                            Tip
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        </Box>
        {/* </GridItem> */}
        {/* <GridItem colSpan={2}> */}

        {/* </GridItem> */}
        {/* </Grid> */}
      </Box>
    </>
  );
}

export default Profile;
