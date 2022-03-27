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
  useToast,
  chakra,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import testp from "../assets/testp.png";
import gallery from "../assets/gallery.png";
import * as IPFS from "ipfs-core";

import { createPost } from "../helpers/post";

function CreatePost() {
  const toast = useToast();
  const [checker, setChecker] = useState(false);
  const [content, setContent] = useState("");
  const [fileIPFS, setFileIPFS] = useState();

  const [{ name, file }, setFile] = useState({
    name: gallery,
    file: "",
  });

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile({
        file: e.target.files[0],
        name: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  useEffect(() => {
    checker &&
      toast({
        title: "Please Wait!",
        description: "Submitting file to IPFS...",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    console.log(checker);
    checker &&
      setInterval(() => {
        window.location.reload();
      }, 15000);
    // checker && window.location.reload();
  }, [checker]);

  async function add() {
    const ipfs = await IPFS.create();

    const { cid } = await ipfs.add(file);

    // console.log("file string", cid.toString());
    const CID = file ? cid : "na";
    console.log(CID);
    return CID;
  }

  return (
    <>
      <Box
        bg="white"
        rounded="10px"
        p="0.5em"
        boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
        mb="1em"
        align="left"
        mx="4%"
      >
        <Grid templateColumns="repeat(3,1fr)">
          <GridItem colSpan={2}>
            <Textarea
              placeholder="Write a caption"
              size="sm"
              resize="vertical"
              w="115%"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              onClick={async () => {
                const CID = await add();
                await createPost(content, CID, setChecker);
                // dataa && setChecker(true);
              }}
            >
              Share
            </Button>
          </GridItem>
          <GridItem alignItems="center" colSpan={1} h="100%" w="100%">
            <chakra.label
              cursor="pointer"
              rounded="md"
              fontSize="md"
              size="sm"
              fontWeight="medium"
              color={useColorModeValue("brand.600", "brand.200")}
              pos="relative"
              _hover={{
                color: useColorModeValue("brand.400", "brand.300"),
              }}
            >
              <Flex justifyContent="right" align="center" rounded="10px">
                <Image
                  h="100%"
                  w="140px"
                  pt="3px"
                  p="2em"
                  rounded="20px"
                  src={name}
                />
              </Flex>
              <VisuallyHidden>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="*"
                  onChange={handleFile}
                />
              </VisuallyHidden>
            </chakra.label>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default CreatePost;
