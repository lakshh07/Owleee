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
import PostsSection from "./PostsSection";
import Profile from "./Profile";

function MainGrid() {
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
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box h="670px" overflow="auto">
                <PostsSection />
              </Box>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <Profile />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default MainGrid;
