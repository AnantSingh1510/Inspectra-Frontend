import { Box, Button, Input, SimpleGrid, Spinner, Tabs, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuSquareCheck, LuUser } from "react-icons/lu";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import LoadingScreen from "../components/LoadingScreen"; // Add the LoadingScreen import

const Review = () => {
  const [owner, setOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [prNumber, setPrNumber] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [reviewResult, setReviewResult] = useState(null);

  const handleManualSubmit = async () => {
    setError(null);
    if (!owner || !repoName || !prNumber) {
      setError('All fields are required!');
      return;
    }
    generatePrReview();
  };

  const [autoSubmit, setAutoSubmit] = useState(false);

  const handleLinkSubmit = () => {
    setError(null);
    if (!repoLink) {
      setError("Please provide the GitHub link");
      return;
    }

    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/;
    const match = repoLink.match(regex);

    if (match) {
      const ownerName = match[1];
      const repo = match[2];
      const pullNumber = match[3].toString();

      setAutoSubmit(true);
      setOwner(ownerName.trim());
      setRepoName(repo.trim());
      setPrNumber(pullNumber);
    } else {
      setError("Invalid GitHub PR URL");
    }
  };

  useEffect(() => {
    if (autoSubmit && owner && repoName && prNumber) {
      generatePrReview();
      setAutoSubmit(false);
    }
  }, [autoSubmit, owner, repoName, prNumber]);

  const generatePrReview = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/protected/pull-request/review', {
        owner: owner,
        repo: repoName,
        pull_number: prNumber
      }, {
        withCredentials: true
      });

      setReviewResult(response.data.data);
    } catch (error) {
      console.error('Error while generating PR review: ', error);
      setError('Error while generating PR review');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />; // Add the loading screen here
  }

  const inputBg = 'gray.800';
  const borderColor = 'gray.700';
  const buttonHoverBg = 'blue.300';

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      p={8}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} maxW="1200px" mx="auto">
        <Tabs.Root defaultValue="manual" variant="enclosed-colored" colorScheme="teal">
          <Tabs.List border="none" mb={6}>
            <Tabs.Trigger
              value="manual"
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
              Manual Input
            </Tabs.Trigger>
            <Tabs.Trigger
              value="link"
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
              PR Link
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="link" pt={4}>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Enter GitHub pull request link"
                onChange={(e) => setRepoLink(e.target.value)}
                value={repoLink}
                bg={inputBg}
                borderColor={borderColor}
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal.300"
                }}
              />
              {error && <Text color="red.400" fontSize="sm">{error}</Text>}
              <Button
                onClick={handleLinkSubmit}
                bgGradient="linear(to-r, teal.400, cyan.400)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, teal.500, cyan.500)",
                  transform: "translateY(-2px)"
                }}
                _active={{ transform: "scale(0.98)" }}
                isLoading={loading}
                loadingText="Analyzing..."
              >
                Analyze PR
              </Button>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="manual" pt={4}>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Repository Owner"
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
                bg={inputBg}
                borderColor={borderColor}
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal.300"
                }}
              />
              <Input
                placeholder="Repository Name"
                onChange={(e) => setRepoName(e.target.value)}
                value={repoName}
                bg={inputBg}
                borderColor={borderColor}
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal.300"
                }}
              />
              <Input
                placeholder="Pull Request Number"
                onChange={(e) => setPrNumber(e.target.value)}
                value={prNumber}
                bg={inputBg}
                borderColor={borderColor}
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal.300"
                }}
              />
              {error && <Text color="red.400" fontSize="sm">{error}</Text>}
              <Button
                onClick={handleManualSubmit}
                bgGradient="linear(to-r, teal.400, cyan.400)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, teal.500, cyan.500)",
                  transform: "translateY(-2px)"
                }}
                _active={{ transform: "scale(0.98)" }}
                isLoading={loading}
                loadingText="Analyzing..."
              >
                Generate Review
              </Button>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>

        {reviewResult && (
          <Box
            p={6}
            borderRadius="xl"
            bgGradient="linear(to-br, gray.800, gray.700)"
            border="1px solid"
            borderColor="gray.600"
            boxShadow="xl"
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children }) {
                  const language = className?.replace('language-', '');
                  return !inline && language ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={language}
                      customStyle={{
                        background: '#1a1a1a',
                        borderRadius: '8px',
                        padding: '1rem',
                        margin: '1rem 0'
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code style={{
                      background: '#2D2D2D',
                      padding: '0.2em 0.4em',
                      borderRadius: '4px',
                      color: '#64ffda'
                    }}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {reviewResult}
            </ReactMarkdown>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Review;
