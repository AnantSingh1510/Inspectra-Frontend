import { Button, Card, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, 
  Heading, HStack, SimpleGrid, Tabs, Text, VStack, List, Icon, Box, Badge, Link, AvatarIcon} from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { FaArrowRight, FaExclamationTriangle } from "react-icons/fa"
import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../redux/userSlice"
import LoadingScreen from "../components/LoadingScreen"

const Profile = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchHistory = async() => {
    setLoading(true);
    try {
      const response = await axios.get('https://inspectra-backend.onrender.com/protected/pull-request/history', { withCredentials: true });
      setHistory(response.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "Invalid Date" : format(parsedDate, "MMMM dd, yyyy hh:mm:ss a");
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.delete('https://inspectra-backend.onrender.com/protected/deleteAccount', { withCredentials: true });
      console.log(response.data.message);
    } catch (err) {
      console.error('Error deleting account:', err);
    } finally {
      setLoading(false);
      dispatch(logoutUser());
      navigate('/');
    }
  }

  useEffect(()=> {
    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Box
      minH="100vh"
      bgGradient="radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)"
      color="white"
      p={8}
    >
      <Tabs.Root defaultValue="personal" variant='enclosed-colored' colorScheme="teal">
        <Tabs.List border="none" mb={8}>
          <Tabs.Trigger
            value="personal"
            _selected={{ 
              color: "teal.300", 
              borderBottom: "2px solid",
              borderColor: "teal.400"
            }}
            fontSize="lg"
            px={6}
            py={3}
          >
            <LuUser style={{ marginRight: "8px" }} />
            Personal Info
          </Tabs.Trigger>
          <Tabs.Trigger
            value="usage"
            _selected={{ 
              color: "teal.300", 
              borderBottom: "2px solid",
              borderColor: "teal.400"
            }}
            fontSize="lg"
            px={6}
            py={3}
          >
            <LuFolder style={{ marginRight: "8px" }} />
            Usage History
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tasks"
            _selected={{ 
              color: "teal.300", 
              borderBottom: "2px solid",
              borderColor: "teal.400"
            }}
            fontSize="lg"
            px={6}
            py={3}
          >
            <LuSquareCheck style={{ marginRight: "8px" }} />
            Account Settings
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="personal">
          <Card.Root 
            maxW="400px" 
            bgGradient="linear-gradient(to bottom right, #27272A, #3F3F46)"
            borderRadius="2xl"
            boxShadow="xl"
            p={6}
            transition="all 0.3s ease"
            _hover={{ transform: "translateY(-4px)" }}
          >
            <Card.Body textAlign="center">
              <Box justifyItems='center'>
              <AvatarIcon boxSize={{ base: "100px", md: "150px", lg: "100px" }}
                mb={{ base: 2, md: 4 }}/>
              </Box>
              
              <VStack spacing={{ base: 1, md: 2 }}>
                <Heading 
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                  bgGradient="linear-gradient(to right, #5EEAD4, #22D3EE)" 
                  bgClip="text"
                  lineHeight={{ base: 1.2, md: 1.3 }}
                >
                  {user.username}
                </Heading>
                <Text 
                  fontSize={{ base: "sm", md: "md" }} 
                  color="gray.300"
                  noOfLines={1}
                >
                  {user.email}
                </Text>
              </VStack>

              <VStack 
                spacing={{ base: 0.5, md: 1 }} 
                mt={{ base: 4, md: 6 }} 
                color="gray.400"
              >
                <Text fontSize={{ base: "xs", md: "sm" }}>
                  Member since:{" "}
                  <Text as="span" color="teal.300">
                    {formatDate(user.createdAt)}
                  </Text>
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>
                  Last updated:{" "}
                  <Text as="span" color="teal.300">
                    {formatDate(user.updatedAt)}
                  </Text>
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        <Tabs.Content value="usage">
          <Heading size="xl" mb={6} color="teal.300">
            Review History
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((item, index) => (
                <Card.Root 
                  key={index} 
                  bg="gray.800"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.700"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: "teal.500",
                    transform: "translateY(-4px)"
                  }}
                >
                  <Card.Body p={6}>
                    <VStack align="start" spacing={3}>
                      <Heading size="md" color='teal.300'>
                        {item.repoName}
                      </Heading>
                      <Text fontSize="sm" color="gray.300">
                        Owner:{" "}
                        <Text as="span" color="white">
                          {item.repoOwner}
                        </Text>
                      </Text>
                      <Text fontSize="sm" color="gray.300">
                        PR #{item.prNumber}
                      </Text>
                      <Link
                        href={`https://github.com/${item.repoOwner}/${item.repoName}/pull/${item.prNumber}`}
                        isExternal
                        color="cyan.300"
                        fontSize="sm"
                      >
                        View on GitHub
                      </Link>
                      <Text fontSize="xs" color="gray.500">
                        {format(new Date(item.createdAt), "MMM dd, yyyy · hh:mm a")}
                      </Text>
                      <Badge 
                        variant="subtle" 
                        bg={item.status === 'Completed' ? 'green' : 'green'}
                        alignSelf="flex-start"
                      >
                        {item.status || 'Completed'}
                      </Badge>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))
            ) : (
              <Text color="gray.400">No review history available</Text>
            )}
          </SimpleGrid>
          <HStack justify="center" mt={8} spacing={6}>
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              variant="outline"
              colorScheme="teal"
            >
              Previous
            </Button>
            <Text color="gray.300">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              variant="outline"
              colorScheme="teal"
            >
              Next
            </Button>
          </HStack>
        </Tabs.Content>

        <Tabs.Content value="tasks">
          <Box maxW="600px">
            <Heading size="xl" mb={6} color="teal.300">
              Account Settings
            </Heading>
            
            <DialogRoot>
              <DialogTrigger>
                <Button
                  colorScheme="red"
                  color='white'
                  bg='red.500'
                  variant="outline"
                  rightIcon={<FaArrowRight />}
                  _hover={{
                    bgGradient: "linear-gradient(to right, #DC2626, #EF4444)",
                    color: "white"
                  }}
                >
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent
                bg="gray.800"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.700"
              >
                <DialogHeader borderBottom="1px solid" borderColor="gray.700" pb={4}>
                  <DialogTitle fontSize="xl" color="red.300">
                    Confirm Account Deletion
                  </DialogTitle>
                </DialogHeader>
                <DialogBody py={6}>
                  <VStack spacing={4}>
                    <Icon as={FaExclamationTriangle} boxSize={8} color="red.400" />
                    <Text textAlign="center" color="gray.300">
                      This action cannot be undone. All your data including:
                    </Text>
                    <List.Root spacing={2} color="gray.400">
                      <List.Item>• Review history</List.Item>
                      <List.Item>• Account credentials</List.Item>
                      <List.Item>• Personal information</List.Item>
                    </List.Root>
                    <Text color="red.200" fontWeight="medium">
                      Will be permanently deleted!
                    </Text>
                  </VStack>
                </DialogBody>
                <DialogFooter borderTop="1px solid" borderColor="gray.700" pt={4}>
                  <HStack spacing={4}>
                    <DialogCloseTrigger asChild>
                      <Button variant="ghost" colorScheme="gray">
                        Cancel
                      </Button>
                    </DialogCloseTrigger>
                    <Button
                      bg="red"
                      color='white'
                      isLoading={loading}
                      loadingText="Deleting..."
                      onClick={handleDeleteAccount}
                      rightIcon={<FaArrowRight />}
                    >
                      Confirm Delete
                    </Button>
                  </HStack>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export default Profile;
