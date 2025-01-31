import { Box, SimpleGrid, Link, Text, VStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="#18181B" color="white" py={6} mt={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {/* Column 1: Links */}
        <VStack align="center" spacing={2}>
          <Text fontWeight="bold">Quick Links</Text>
          <Link to="/">
            Home
          </Link>
          <Link to="/auth/dashboard">
            Dashboard
          </Link>
          <Link to="#">
            About
          </Link>
          <Link to="#">
            Contact
          </Link>
        </VStack>

        {/* Column 2: Social Media Icons */}
        <VStack align="center" spacing={2}>
          <Text fontWeight="bold">My Socials: </Text>
          <Box>
            <Link target='_blank' href={"https://www.x.com/AnantSingh1510"} isExternal>
              <IconButton bg='transparent'>
                <FaTwitter color='white'/>
              </IconButton>
            </Link>
            <Link target='_blank' href={"https://www.linkedin.com/in/AnantSingh1510"} isExternal>
              <IconButton bg='transparent'>
                <FaLinkedin color='white'/>
              </IconButton>
            </Link>
            <Link target='_blank' href={"https://www.instagram.com/_anant.singh_"} isExternal>
              <IconButton bg='transparent'>
                <FaInstagram color='white'/>
              </IconButton>
            </Link>
          </Box>
            
        </VStack>

        {/* Column 3: Copyright */}
        <VStack align="center" spacing={2}>
          <Text fontWeight="bold">Built by Anant Singh</Text>
          <Text fontSize="sm">
            Hobby project made to make GitHub pull request integration easier using AI.
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
