import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { FaCalendar, FaCode, FaHome, FaPagelines, FaPersonBooth, FaSignOutAlt, FaTablet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuHoverBg = "teal.800";
  const activeBg = "gray.700";


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    // { path: "/", name: "Home", icon: FaHome },
    { path: "/auth/dashboard", name: "Dashboard", icon: FaTablet },
    { path: "/auth/profile", name: "Profile", icon: FaPersonBooth },
    { path: "/auth/review", name: "Review", icon: FaCode },
    { path: "/auth/activity", name: "Activity", icon: FaCalendar },
    { path: "/auth/projects", name: "Projects", icon: FaPagelines },
  ];

  return (
    <Box
      width={{ base: "100%", lg: "25%", xl: "15%" }}
      height={{ lg: "100vh" }}
      position={{lg:"fixed"}}
      bg="gray.900"
      borderRight="1px solid"
      borderColor="gray.700"
      p={6}
    >
      <Flex direction="column" height="100%">
        {/* Logo/Menu Header */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={8}
          bgGradient="linear-gradient(45deg, #64ffda 0%, #10b981 50%, #00c8ff 100%)"
          bgClip="text"
          cursor='pointer'
          onClick={() => navigate('/')}
        >
          Inspectra
        </Text>

        {/* Navigation Items */}
        <Flex direction="column" gap={2} flex={1}>
          {navItems.map((item) => (
            <NavLink to={item.path} key={item.path} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  p={3}
                  borderRadius="lg"
                  bg={isActive ? activeBg : "transparent"}
                  _hover={{ bg: menuHoverBg, transform: "translateX(4px)" }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Icon
                    as={item.icon}
                    boxSize={5}
                    color={isActive ? "teal.400" : "gray.400"}
                    mr={3}
                  />
                  <Text
                    fontWeight={isActive ? "semibold" : "medium"}
                    color={isActive ? "teal.300" : "gray.300"}
                  >
                    {item.name}
                  </Text>
                </Flex>
              )}
            </NavLink>
          ))}
        </Flex>

        {/* Logout Button */}
        <Button
          variant="ghost"
          justifyContent="flex-start"
          color="gray.400"
          _hover={{ 
            bg: "red.800",
            color: "red.200",
            transform: "translateX(4px)"
          }}
          onClick={handleLogout}
          leftIcon={<FaSignOutAlt />}
          mt={4}
          transition="all 0.3s ease"
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;