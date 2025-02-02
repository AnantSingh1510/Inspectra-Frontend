import { Box, Flex, Heading, HStack, Image, Spacer, Text } from "@chakra-ui/react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username)
  const username = useSelector((state) => state.user.username);
  const text = '< Inspectra />'

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("https://inspectra-backend.onrender.com/protected/me", { withCredentials: true });
        dispatch(setUser(response.data.user))
      } catch (err) {
        console.error("User not authenticated", err);
      }
    };

    if (!user){
      fetchUser();
    }
  }, [user, dispatch])

  return (
    <Flex as="nav" p={['10px', '20px']} mb='60px' alignItems='center' flexDirection={['column', 'row']}>
      {/* <Heading as="h1" fontSize={['1.5em', '2em']} textAlign={['center', 'left']}>Inspectra</Heading> */}
      <Text
          as="h1"
          fontSize={['1.5em', '2em']}
          fontWeight="bold"
          bgGradient="linear-gradient(45deg, #64ffda 0%, #10b981 50%, #00c8ff 100%)"
          bgClip="text"
          width='100%'
          letterSpacing="tighter"
          textShadow="0 0 20px rgba(100, 255, 218, 0.3)"
          textAlign={['center', 'left']}
        >
          {text}
        </Text>

      <Spacer />

      <HStack mt={{base: '1.5em', sm: '0'}} spacing='20px' alignItems='center' justifyContent={['center', 'flex-end']} w="full">
        <Box bg="green.200" color='black' p="10px 15px" borderRadius="50%">
          {username ? username[0].toUpperCase() : 'X'}
        </Box>
        <Text pr='20px' display={['none', 'block']}>
          {username ? username : 'Please login'}
        </Text>
        {/* <Button bg='red.500' color='white' onClick={handleLogout}>
          Logout
        </Button> */}
      </HStack>
    </Flex>
  )
}

export default Navbar;
