import { useState } from "react";
import { Box, Button, Input, Tabs, IconButton } from "@chakra-ui/react";
import { LuFolder, LuUser } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { VStack, Text } from "@chakra-ui/react";

const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email Validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password Validation
  // const isValidPassword = (password) => {
  //   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  // };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    // if (!isValidEmail(email)) {
    //   setError("Invalid email format.");
    //   return;
    // }

    try {
      await axios.post("https://inspectra-backend.onrender.com/login", { email, password }, { withCredentials: true });

      console.log("Logging in with", { email });
      setError(""); // Clear error on success
      navigate("/auth");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setError("All fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    // if (!isValidPassword(password)) {
    //   setError(
    //     "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
    //   );
    //   return;
    // }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://inspectra-backend.onrender.com/signup", { email, password, username }, { withCredentials: true });

      console.log("Signing up with", { email });
      dispatch(setUser(response.data.user));
      setError(""); // Clear error on success

      navigate("/auth/dashboard");
    } catch (error) {
      console.error("Something went wrong:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear-gradient(145deg, #0a192f 0%, #172a45 100%)"
      position="relative"
    >
      <IconButton
        aria-label="Go back"
        icon={<FaArrowLeft />}
        position="absolute"
        top="6"
        left="6"
        bg="teal.600"
        color="white"
        _hover={{ bg: "teal.500" }}
        onClick={() => navigate("/")}
      />

      <Box maxW="400px" w="full" px={4}>
        <Tabs.Root defaultValue="link" variant="unstyled">
          <Tabs.List justifyContent="center" gap={4} mb={8}>
            <Tabs.Trigger
              value="link"
              _selected={{
                color: "teal.300",
                borderBottom: "2px solid",
                borderColor: "teal.400"
              }}
              fontSize="md"
              px={4}
              py={2}
              color="gray.400"
            >
              <LuUser style={{ marginRight: "8px" }} />
              Login
            </Tabs.Trigger>
            <Tabs.Trigger
              value="manual"
              _selected={{
                color: "teal.300",
                borderBottom: "2px solid",
                borderColor: "teal.400"
              }}
              fontSize="md"
              px={4}
              py={2}
              color="gray.400"
            >
              <LuFolder style={{ marginRight: "8px" }} />
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>

          {/* Login Form */}
          <Tabs.Content value="link">
            <VStack spacing={4}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              {error && <Text color="red.400" fontSize="sm">{error}</Text>}
              <Button
                w="full"
                bgGradient="linear-gradient(to right, #5EEAD4, #22D3EE)"
                color="black"
                _hover={{ bgGradient: "linear-gradient(to right, #14B8A6, #06B6D4)" }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </VStack>
          </Tabs.Content>

          {/* Signup Form */}
          <Tabs.Content value="manual">
            <VStack spacing={4}>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg="rgb(23, 41, 65)"
                borderColor="gray.700"
                _focus={{ borderColor: "teal.300" }}
              />
              {error && <Text color="red.400" fontSize="sm">{error}</Text>}
              <Button
                w="full"
                bgGradient="linear-gradient(to right, #5EEAD4, #22D3EE)"
                color="black"
                _hover={{ bgGradient: "linear-gradient(to right, #14B8A6, #06B6D4)" }}
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default Authenticate;
