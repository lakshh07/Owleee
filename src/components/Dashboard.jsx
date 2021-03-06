import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../context/loading";
import Navbar from "./Navbar";
import PostsSection from "./PostsSection";

import login from "../helpers/login.ts";

import logo from "../assets/logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

import truncateMiddle from "truncate-middle";
import LiveStreaming from "./LiveStreaming";
import MainGrid from "./MainGrid";
import { useAccount } from "wagmi";
import CreateToken from "./CreateToken";
import Friends from "./Friends";

function Dashboard({
  avatar,
  connect,
  connectQuery,
  accountData,
  disconnect,
  chainName,
}) {
  const { loading } = useLoadingContext();
  const navigate = useNavigate();
  const [getStarted, setGetStarted] = useState(false);
  //   const [{ data: accountData }, disconnect] = useAccount({
  //     fetchEns: true,
  //   });

  React.useEffect(() => {
    // login();
  }, []);
  return (
    <>
      <Box bg="#77787A" p="0.5em" h="100vh" overflow="hidden">
        {getStarted ? (
          <Box bg="whiteSmoke" h="100%" w="100%" borderRadius="20px">
            <Navbar
              avatar={avatar}
              connect={connect}
              chainName={chainName}
              connectQuery={connectQuery}
              accountData={accountData}
              disconnect={disconnect}
            />
            <CreateToken />
          </Box>
        ) : (
          <Grid className="grid" h="100%" borderRadius="20px">
            <GridItem bg="rgb(235,235,235)" borderLeftRadius="20px">
              <Box w="100%">
                <Flex
                  ml="1em"
                  mt="1em"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image mr="1em" src={logo} />
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiSearchAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      variant="filled"
                      w="90%"
                      placeholder="Search"
                    />
                  </InputGroup>
                </Flex>

                <Friends />
              </Box>
            </GridItem>
            <GridItem bg="whitesmoke">
              <MainGrid accountData={accountData} />
            </GridItem>
            <GridItem bg="rgb(235,235,235)" borderRightRadius="20px">
              <Flex
                mr="1em"
                mt="1em"
                alignItems="center"
                justifyContent="right"
              >
                <MdOutlineNotificationsActive
                  className="h-shadow"
                  fontSize="20px"
                />
                <Flex alignItems="center" px="1em" ml="0.5em" py="0.5em">
                  <Avatar mr="15px" size="sm" src={avatar} />
                  <Box mr="15px">
                    {accountData && (
                      <Text fontWeight={500} lineHeight="1.1em">
                        {truncateMiddle(accountData.address || "", 5, 4, "...")}
                        <br />
                        {chainName.chain?.name}
                      </Text>
                    )}
                  </Box>
                  <IconButton
                    aria-label="logout"
                    icon={<AiOutlineLogout />}
                    onClick={() => {
                      disconnect();
                      navigate("/");
                    }}
                  />
                </Flex>
              </Flex>
              <LiveStreaming />
            </GridItem>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
