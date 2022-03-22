import {
  Box,
  Grid,
  GridItem,
  Textarea,
  Input,
  Button,
  Image,
  Flex,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import testp from "../assets/testp.png";
import gallery from "../assets/gallery.png";

function CreatePost() {
  return (
    <>
      <Box
        bg="white"
        rounded="10px"
        p="0.5em"
        boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
        mb="1em"
        align="left"
      >
        <Grid templateColumns="repeat(3,1fr)">
          <GridItem colSpan={2}>
            <Textarea
              placeholder="Write a caption"
              size="sm"
              resize="vertical"
              w="115%"
            />
            <Button
              mb="5px"
              mt="15px"
              ml="10px"
              rounded="30px"
              p="1em"
              bg="#3764E5"
              color="white"
              boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
              _hover={{
                bg: "#3764E5",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
              }}
              w="min-content"
            >
              Share
            </Button>
          </GridItem>
          <GridItem alignItems="center" colSpan={1} h="100%" w="100%">
            <Flex justifyContent="right" align="center" rounded="10px">
              <Image
                h="100%"
                w="140px"
                pt="3px"
                p="2em"
                rounded="20px"
                src={gallery}
              />
              {/* <Image h="100%" w="140px" pt="3px" rounded="20px" src={testp} /> */}
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default CreatePost;
