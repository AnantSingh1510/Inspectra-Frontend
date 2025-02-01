import {
  Box,
  Card,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Link,
  Spinner,
  HStack
} from "@chakra-ui/react";
import LineChartComponent from "../components/LineChartComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { subMonths, format } from "date-fns";
import LoadingScreen from "../components/LoadingScreen";

const Dashboard = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [popularRepos, setPopularRepos] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's history data
  const fetchHistory = async () => {
    try {
      const response = await axios.get("https://inspectra-backend.onrender.com/protected/pull-request/history", { withCredentials: true });
      const rawData = response.data.data || [];
      setHistory(rawData);

      const lastFourMonths = Array.from({ length: 4 }, (_, i) =>
        format(subMonths(new Date(), i), "MMM")
      ).reverse();

      const monthlyData = rawData.reduce((acc, item) => {
        const month = format(new Date(item.createdAt), "MMM");
        if (!acc[month]) acc[month] = { name: month, PRs: 0, Reviews: 0 };
        acc[month].PRs += 1;
        acc[month].Reviews += item.reviewCount;
        return acc;
      }, {});

      const formattedData = lastFourMonths.map((month) => ({
        name: month,
        PRs: monthlyData[month]?.PRs || 0,
        Reviews: monthlyData[month]?.Reviews || 0,
      }));

      setHistory(formattedData);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  // Fetch popular repositories
  const fetchPopularRepositories = async () => {
    try {
      const response = await axios.get("https://api.github.com/search/repositories", {
        params: {
          q: "stars:>10000",
          sort: "stars",
          order: "desc",
          per_page: 6,
        },
      });
      setPopularRepos(response.data.items);
    } catch (error) {
      console.error("Error fetching popular repositories:", error);
    }
  };

  // Fetch open source news
  const fetchOpenSourceNews = async () => {
    try {
      const response = await axios.get("https://dev.to/api/articles?tag=opensource&top=5");
      setNews(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching open source news:", error);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await axios.get("https://inspectra-backend.onrender.com/protected/dashboard", {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to fetch dashboard data.");
        navigate("/credentials");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchHistory();
    fetchPopularRepositories();
    fetchOpenSourceNews();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      minHeight="100vh"
      bg="gray.900"
      color="white"
      p={8}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 60%);',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <Box position="relative" zIndex={1}>
        <Heading 
          fontSize="2em" 
          mb={5}
          p={4}
          bgGradient="linear-gradient(45deg, #64ffda 0%, #10b981 50%, #00c8ff 100%)"
          bgClip="text"
          textShadow="0 0 20px rgba(100, 255, 218, 0.3)"
        >
          ⚙️ Dashboard
        </Heading>

        {/* Chart Section */}
        <Box 
          width="100%" 
          height={300}
          bg="gray.800"
          borderRadius="xl"
          p={6}
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.4)"
        >
          <LineChartComponent reviewData={history} />
        </Box>

        {/* Popular Repositories Section */}
        <Box mt={12}>
          <Heading as="h2" fontSize="xl" mb={6} color="teal.400">
            🔥 Popular Repositories
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
            {popularRepos.map((repo, index) => (
              <Card.Root 
                key={index} 
                bg="gray.800"
                p={6}
                borderRadius="xl"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)"
                }}
              >
                <Card.Body>
                  <Grid templateColumns={{ sm: "1fr", md: '1fr auto' }} gap={6} alignItems="center">
                    <Box>
                      <Card.Title
                        color="white"
                        bgGradient="linear-gradient(45deg, #10b981, #00c8ff)"
                        bgClip="text"
                      >
                        {repo.name}
                      </Card.Title>
                      <Card.Description mt={3} color="gray.300">
                        <Text><b>Owner:</b> {repo.owner.login}</Text>
                        <Text><b>Forks:</b> {repo.forks}</Text>
                        <Text><b>Language:</b> {repo.language || "N/A"}</Text>
                        <Text color="pink.400"><b>Open Issues:</b> {repo.open_issues}</Text>
                      </Card.Description>
                    </Box>

                    <Image
                      src={repo.owner.avatar_url}
                      alt={`${repo.owner.login}'s avatar`}
                      borderRadius="full"
                      boxSize={{ base: "80px", md: "100px" }}
                      objectFit="cover"
                      border="2px solid"
                      borderColor="teal.600"
                      boxShadow="0 0 15px rgba(16, 185, 129, 0.3)"
                    />
                  </Grid>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Box>

        {/* Open Source News Section */}
        <Box mt={12}>
          <Heading as="h2" fontSize="xl" mb={6} color="teal.400">
            📰 Open Source News
          </Heading>
          {loading ? (
            <Spinner size="lg" color="teal.400" />
          ) : (
            <Grid templateColumns={{ base: "1fr", lg: '1fr 1fr' }} gap={6}>
              {news.map((article, index) => (
                <Card.Root 
                  key={index} 
                  bg="gray.800"
                  p={6}
                  borderRadius="xl"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <Card.Body>
                    <Heading size="md">
                      <Link 
                        href={article.url} 
                        isExternal
                        color="white"
                        _hover={{
                          color: "teal.400",
                          textDecoration: "none"
                        }}
                      >
                        {article.title}
                      </Link>
                    </Heading>
                    <Text mt={3} fontSize="sm" color="gray.300">
                      {article.description}
                    </Text>
                    <HStack mt={4} spacing={3}>
                      <Image
                        src={article.user.profile_image}
                        alt={`${article.user.name}'s avatar`}
                        borderRadius="full"
                        boxSize="40px"
                        border="2px solid"
                        borderColor="teal.600"
                      />
                      <Text fontSize="sm" color="teal.300">
                        {article.user.name}
                      </Text>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
