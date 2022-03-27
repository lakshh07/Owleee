import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Button,
  Avatar,
  IconButton,
  Link,
  Grid,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import m2 from "../assets/m2-2.png";
import m3 from "../assets/m2-3.png";
import m1 from "../assets/m2-1.png";
import logo from "../assets/logo.png";
import mainbgweb from "../assets/mainbgweb.webp";
import { AiOutlineLogout } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import truncateMiddle from "truncate-middle";

import client from "../helpers/ceramicLogin";

function Hero({
  avatar,
  connect,
  connectQuery,
  accountData,
  disconnect,
  chainName,
}) {
  const [account, setAccount] = useState();
  const [localDid, setDid] = useState(null);
  const [idxInstance, setIdxInstance] = useState(null);
  const [profile, setProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const idxRef = useRef(null);
  const didRef = useRef(null);
  idxRef.current = idxInstance;
  didRef.current = localDid;

  const toast = useToast();

  let eth, localProfile;

  async function connectProfile() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account);
    // await connect(connectQuery.data.connectors[0]);

    toast({
      title: "Please Wait!",
      description: "Fetching your profile",
      status: "info",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    const cdata = await client();
    const { did, idx, error } = cdata;
    if (error) {
      console.log("error: ", error);
      return;
    }

    setDid(did);
    setIdxInstance(idx);
    console.log(idx);
    const data = await idx.get("basicProfile", did.id);
    if (data) {
      setProfile(data);
      setLoaded(true);
      console.log(data);
      let userName = data.name;
      let userBio = data.bio;
      console.log(userName);
      console.log(userBio);
      localProfile = data;
      toast({
        title: "Success",
        description: "Profile ",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } else if (!data) {
      await idx.set("basicProfile", { name: "Anonymous", bio: "😈" });
      const dataa = await idxRef.current.get("basicProfile", didRef.current.id);
      setProfile(dataa);
      setLoaded(true);
    } else {
      toast({
        title: "Error",
        description: "Not able to fetch your data, Try Again!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("Not able to fetch your data, Try Again!");
    }
  }

  async function updateProfile(bio, name, setChecker) {
    if (!bio && !name) {
      alert("error... no profile information submitted");
      return;
    }
    setChecker(true);
    if (!idxInstance) {
      await connect();
    }
    const user = { ...profile };
    if (bio) user.bio = bio;
    if (name) user.name = name;
    await idxRef.current.set("basicProfile", user);
    setLocalProfileData();
    console.log("profile updated...");
    setChecker(false);
  }

  async function setLocalProfileData() {
    try {
      const data = await idxRef.current.get("basicProfile", didRef.current.id);
      if (!data) return;
      setProfile(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Box bg="#F5F5F5" h="100vh" zIndex="2">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mx="6%"
          py="1em"
          bg="transparent"
        >
          <Flex alignItems="center">
            <Image src={logo} />
            <Heading fontWeight={500}>OWLEEE</Heading>
          </Flex>

          {connectQuery.data.connected && accountData && (
            <Flex
              right="6%"
              position="absolute"
              zIndex="3"
              alignItems="center"
              className="address-box"
              px="1em"
              py="0.5em"
            >
              <Avatar mr="15px" size="sm" src={avatar} />
              <Box mr="15px">
                <Text fontWeight={500} lineHeight="1.1em">
                  {truncateMiddle(accountData.address || "", 5, 4, "...")}
                  <br />
                  {chainName.chain?.name}
                </Text>
              </Box>
              <IconButton
                aria-label="logout"
                icon={<AiOutlineLogout />}
                onClick={disconnect}
              />
            </Flex>
          )}
        </Flex>

        <Image src={mainbgweb} className="bg-img" />

        <Flex
          flexDirection="column"
          justifyContent="center"
          h="85%"
          position="relative"
          pl="5%"
        >
          <Heading
            fontSize="3.5em"
            fontFamily="Philosopher"
            textTransform="capitalize"
            lineHeight="1.3em"
            className="h-shadow"
          >
            the decentralised way to
            <br /> connect and look back
            <br /> on moments and
            <br /> forever...
          </Heading>
          <Text
            lineHeight="1.6em"
            textTransform="capitalize"
            fontSize="1.3em"
            my="1em"
          >
            Your new social media platform with <br /> all stuff that actually
            matters.
          </Text>

          {connectQuery.data.connected ? (
            <Link href="/dashboard">
              <Button
                mt="1em"
                rounded="30px"
                p="1.5em"
                bg="#3764E5"
                color="white"
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                _hover={{
                  bg: "#3764E5",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                w="min-content"
                rightIcon={<BsArrowRight />}
              >
                Get Started
              </Button>
            </Link>
          ) : (
            <Button
              mt="1em"
              rounded="30px"
              p="1.5em"
              bg="#3764E5"
              color="white"
              boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
              _hover={{
                bg: "#3764E5",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              w="min-content"
              onClick={() => {
                connect(connectQuery.data.connectors[0]);
                connectProfile();
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Flex>

        <Box my="10em" align="center">
          <Heading fontSize="3em" fontWeight={500} fontFamily="Montserrat">
            Our Features
          </Heading>
          <Grid
            mt="3em"
            mx="7.5%"
            templateColumns="repeat(3, 1fr)"
            gap={6}
            alignItems="center"
            justifyContent="center"
            fontSize="1.5em"
            fontFamily="Montserrat"
          >
            <Flex
              w="400px"
              alignItems="center"
              py="2em"
              px="1em"
              rounded="10px"
              bg="rgb(224, 224, 224)"
              justifyContent="center"
            >
              <Box flex="2" align="left">
                <Heading
                  fontSize="1.1em"
                  fontFamily="Montserrat"
                  fontWeight="500"
                >
                  Shop
                </Heading>
                <Text mt="15px" fontSize="0.7em">
                  Shop from your favorite directly
                </Text>
              </Box>
              <Image src={m1} height={130} width={130} />
            </Flex>
            <Flex
              w="400px"
              alignItems="center"
              py="2em"
              px="1em"
              rounded="10px"
              bg="rgb(224, 224, 224)"
              justifyContent="center"
            >
              <Box flex="2" align="left">
                <Heading
                  fontSize="1.1em"
                  fontFamily="Montserrat"
                  fontWeight="500"
                >
                  Subscribe
                </Heading>
                <Text mt="15px" fontSize="0.7em">
                  Subscribe your favorite as membership
                </Text>
              </Box>
              <Image src={m3} height={130} width={130} />
            </Flex>
            <Flex
              w="400px"
              alignItems="center"
              py="2em"
              px="1em"
              rounded="10px"
              bg="rgb(224, 224, 224)"
              justifyContent="center"
            >
              <Box flex="2" align="left">
                <Heading
                  fontSize="1.1em"
                  fontFamily="Montserrat"
                  fontWeight="500"
                >
                  React & Share
                </Heading>
                <Text mt="15px" fontSize="0.7em">
                  React your favorite post & share as NFT
                </Text>
              </Box>
              <Image src={m2} height={130} width={130} />
            </Flex>
          </Grid>
        </Box>

        <Box bg="#F5F5F5" align="center">
          <Flex
            mt="3em"
            mx="7.5%"
            p="1em"
            py="1em"
            rounded="10px"
            justifyContent="space-around"
            flexDir="column"
          >
            <Heading
              className="h-shadow"
              fontSize="3em"
              fontFamily="Montserrat"
              fontWeight={500}
            >
              It's time to fill up your memories
            </Heading>
            <Box mt="2em">
              <Text fontFamily="Montserrat">Start your next social life</Text>
              <Button
                mt="20px"
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                rounded="30px"
                p="1.5em"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  right: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                rightIcon={<BsArrowRight />}
              >
                Explore Now
              </Button>
            </Box>
          </Flex>
        </Box>

        <Flex
          fontFamily="Montserrat"
          bg="rgb(190,190,190)"
          mt="10em"
          px="15%"
          py="1em"
          alignItems="center"
          borderBottomRadius="10px"
          justifyContent="space-around"
        >
          <Link href="https://nfthack.ethglobal.co/" isExternal>
            <Text>Build In LFGROW 2022 - ETH GLOBAL</Text>
          </Link>
          <Divider orientation="vertical" height="30px" />
          <Text>
            Build and Designed By{" "}
            <Link href="https://lakshaymaini.ml/" isExternal>
              Lakshay Maini
            </Link>
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default Hero;
