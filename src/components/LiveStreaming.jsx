import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import testp from "../assets/testp.png";
import live from "../assets/live-streaming.png";
import { MdOutlinePeople, MdSend } from "react-icons/md";
import axios from "axios";

import videojs from "video.js";
// import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

function LiveStreaming() {
  const [videoEl, setVideoEl] = useState(null);

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  const playbackId = false;
  // const playbackId = "1e61eaoddfd93gzt";

  useEffect(() => {
    if (videoEl == null) return;
    if (playbackId) {
      const player = videojs("my-player", {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`,
          },
        ],
      });
      player.hlsQualitySelector();
      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });
    }
  }, []);

  function create() {
    console.log("D");
    axios
      .post(
        "https://livepeer.com/api/stream",
        {
          name: "test_stream",
          profiles: [
            {
              name: "720p",
              bitrate: 2000000,
              fps: 30,
              width: 1280,
              height: 720,
            },
            {
              name: "480p",
              bitrate: 1000000,
              fps: 30,
              width: 854,
              height: 480,
            },
            {
              name: "360p",
              bitrate: 500000,
              fps: 30,
              width: 640,
              height: 360,
            },
          ],
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer 3b18de74-bfd7-462b-bfa8-ace485fdd41c", // API Key needs to be passed as a header
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Heading
        fontSize="1.5em"
        mt="1em"
        textAlign="center"
        fontFamily="Montserrat"
        fontWeight={500}
        // className="h-shadow"
      >
        Live Streaming
      </Heading>
      <Box
        align="center"
        position="relative"
        mt="1em"
        w="85%"
        h="78%"
        mx="auto"
        bg="white"
        rounded="25px"
        borderTopRadius="25px"
        overflow="hidden"
        // boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
        boxShadow="rgba(149, 157, 165, 0.2 ) 0px 8px 24px"
      >
        {/* <Image src={testp} borderTopRadius="25px" /> */}
        <video
          // borderTopRadius="25px"
          id="my-player"
          ref={onVideo}
          poster="https://as2.ftcdn.net/v2/jpg/03/45/97/13/1000_F_345971379_5HZVsyK5RljheMNQesEnvBlaEOYdpgIk.jpg"
          className="h-full w-full video-js vjs-theme-city"
          controls
          playsInline
        />

        <Button
          rounded="30px"
          p="1.5em"
          boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
          _hover={{
            bg: "#3764E5",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          w="min-content"
          bg="#3764E5"
          color="white"
          position="relative"
          top="-3%"
          onClick={create}
        >
          Start Stream
        </Button>
        {/* <Box
          position="relative"
          bg="#3764E5"
          w="60%"
          mt="-0.4em"
          top="-3%"
          mx="auto"
          rounded="10px"
          align="left"
          color="white"
          fontSize="14px"
          px="0.8em"
          py="0.5em"
        >
          <Text fontWeight={700}>Live Chat</Text>
          <Flex alignItems="center">
            <MdOutlinePeople />
            <Text ml="5px">1.3k Peoples</Text>
          </Flex>
        </Box> */}

        <Flex
          position="absolute"
          className="grad-box"
          w="100%"
          borderBottomRadius="25px"
          bottom="0"
          px="0.7em"
          justifyContent="space-between"
          alignItems="center"
        >
          <InputGroup bg="transparent" className="b">
            <InputLeftElement children={"😃"} cursor="pointer" />
            <Input
              type="text"
              border="none"
              color="white"
              w="90%"
              placeholder="Add Comment"
              _focus={{ border: "none" }}
            />
            <InputRightElement
              cursor="pointer"
              children={<MdSend color="gray.300" />}
            />
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}

export default LiveStreaming;
