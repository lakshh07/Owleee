import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import truncateMiddle from "truncate-middle";
import logo from "../assets/logo.png";

function Navbar({
  avatar,
  connect,
  connectQuery,
  accountData,
  disconnect,
  chainName,
}) {
  const navigate = useNavigate();
  return (
    <>
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
              onClick={() => {
                disconnect();
                navigate("/");
              }}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default Navbar;
