import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineGeneratingTokens } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { MdOutlineForum } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";

import PostsSection from "./PostsSection";
import Profile from "./Profile";
import UserDashboard from "./UserDashboard";
import Funds from "./Funds";
import TokenFunds from "./TokenFunds";
import Members from "./Members";
import Tiers from "./Tiers";
import Nft from "./Nft";
import Forum from "./Forum";

function MainGrid({ accountData }) {
  return (
    <>
      <Box>
        <Tabs align="center" variant="soft-rounded">
          <TabList
            bg="rgb(235,235,235)"
            w="max-content"
            borderBottomRadius="20px"
            px="1em"
            py="0.5em"
            position="relative"
          >
            <Tooltip hasArrow label="Home" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <AiOutlineHome />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Dashboard" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <RiDashboardLine />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Profile" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <BiUser />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Forum" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <MdOutlineForum />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Tiers" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <FiLock />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Members" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <MdOutlinePeopleAlt />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="Balance" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <BiDollarCircle />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="ASM" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <MdOutlineGeneratingTokens />
              </Tab>
            </Tooltip>

            <Tooltip hasArrow label="NFTs" bg="gray.300" color="black">
              <Tab
                color="black"
                fontWeight={700}
                fontSize="20px"
                _selected={{ bg: "#3764E5", color: "white" }}
                _focus={{ border: "none" }}
              >
                <AiOutlinePicture />
              </Tab>
            </Tooltip>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box h="670px" overflow="auto">
                <PostsSection />
              </Box>
            </TabPanel>

            <TabPanel>
              <Box h="670px" overflow="auto">
                <UserDashboard />
              </Box>
            </TabPanel>

            <TabPanel>
              <Box h="670px" overflow="auto">
                <Profile />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box h="670px" overflow="auto">
                <Forum accountData={accountData} />
              </Box>
            </TabPanel>

            <TabPanel>
              <Tiers />
            </TabPanel>

            <TabPanel>
              <Members />
            </TabPanel>

            <TabPanel>
              <Funds />
            </TabPanel>

            <TabPanel>
              <TokenFunds />
            </TabPanel>

            <TabPanel>
              <Nft />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default MainGrid;
