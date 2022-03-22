import React from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import { useLoadingContext } from "../context/loading";

function Loading() {
  const { loading } = useLoadingContext();
  return (
    <Box
      display={loading ? "block" : "none"}
      zIndex="999"
      position="fixed"
      w="100%"
      h="100%"
      my="auto"
      overflow="hidden"
      className="blur2-box"
    >
      <Box position="relative" top="40%">
        <Box top="50%">
          <Stack spacing="1em" alignItems="center">
            <Box align="center">
              <Heading fontSize="3em" fontFamily="Philosopher">
                OWLEEE
              </Heading>
              <Text fontFamily="Philosopher">A Metaverse Social Media</Text>
            </Box>
            <Box className="loading-bar"></Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Loading;
