import { Spinner, Box, Text, Center } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="9999"
    >
      <Box textAlign="center" color="white">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="orange.400" />
        <Text mt={4}>{'Loading'}</Text>
      </Box>
    </Center>
  );
};

export default LoadingScreen;
