import { Box, Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" minHeight="100vh">
      {/* Sidebar */}
      <GridItem
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        bg="#18181B"
        // minHeight={{ lg: '100vh' }}
      >
        <Sidebar />
      </GridItem>

      {/* Main Content + Navbar + Footer */}
      <GridItem
        colSpan={{ base: 6, lg: 4, xl: 5 }}
        bg="#18181B"
        display="flex"
        flexDirection="column"
      >
        <Navbar />
        <Box minH='55vh'>
          <Outlet /> 
        </Box>
        <Footer style={{ margin: 0, padding: 0 }} />
      </GridItem>
    </Grid>
  );
};

export default RootLayout;
