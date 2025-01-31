import { Box, Flex, Image, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const handleGetStarted = () => {
    if (!username) {
      navigate("/credentials");
      return;
    }
    navigate("/auth/dashboard");
  };

  useEffect(() => {
    const startRenderService = async() => {
      try{
        await axios.get('https://inspectra-backend.onrender.com/protected/dashboard');
      } catch {
        console.log('Starting the backend service')
      } finally {
        console.log('this might take 50s or more, please wait')
      }
    }

    startRenderService();
  }, [])

  return (
    <Box
      minHeight="100vh"
      backgroundGradient="linear-gradient(145deg, #0a192f 0%, #172a45 50%, #1a365d 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      px={6}
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        maxWidth="900px"
        w="100%"
        position="relative"
      >
        {/* Animated background elements */}
        <Box
          position="absolute"
          w="120%"
          h="120%"
          bgGradient="radial(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)"
          pointerEvents="none"
        />

        {/* Logo */}
        <Image 
          src="../src/assets/react.svg" 
          height="100px" 
          mb={4}
          filter="drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))"
        />

        {/* Main Title */}
        <Text
          as="h1"
          fontSize={{ base: "50px", md: "70px" }}
          fontWeight="bold"
          bgGradient="linear-gradient(45deg, #64ffda 0%, #10b981 50%, #00c8ff 100%)"
          bgClip="text"
          lineHeight="1.1"
          letterSpacing="tighter"
          textShadow="0 0 20px rgba(100, 255, 218, 0.3)"
        >
          Inspectra
        </Text>

        {/* Subtitle */}
        <Text 
          fontSize="xl" 
          mt={4} 
          color="gray.300"
          maxW="700px"
          fontWeight="medium"
          opacity="0.9"
        >
          Your personal AI-powered code review agent. Elevate your coding experience with intelligent, real-time feedback.
        </Text>

        {/* Call-to-Action Button */}
        <Button
          mt="40px"
          size="lg"
          px="8"
          py="6"
          fontSize="lg"
          fontWeight="bold"
          bgGradient="linear-gradient(45deg, #10b981 0%, #00c8ff 100%)"
          color="white"
          borderRadius="xl"
          boxShadow="0 4px 15px rgba(16, 185, 129, 0.4)"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          _hover={{
            transform: "scale(1.05) translateY(-2px)",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.6)",
            bgGradient: "linear-gradient(45deg, #10b981 -20%, #00c8ff 120%)"
          }}
          _active={{
            transform: "scale(0.98)",
            boxShadow: "0 2px 10px rgba(16, 185, 129, 0.4)"
          }}
          rightIcon={<FaArrowRight style={{ transition: "transform 0.3s ease" }} />}
          // _hover={{
          //   "& > svg": {
          //     transform: "translateX(3px)"
          //   }
          // }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>

        {/* Additional UI Elements */}
        <Flex mt={10} gap={4} color="gray.400" alignItems="center">
          <Box w="40px" h="2px" bgGradient="linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)" />
          <Text fontSize="sm">GitHub PR review assistant</Text>
          <Box w="40px" h="2px" bgGradient="linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Homepage;
