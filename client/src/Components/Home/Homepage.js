import React, { Fragment } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, logoutsuccess } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/image");
    }
  }, [dispatch, error, logoutsuccess, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container maxW="xl" centerContent>
            <Box
              display="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
                Demo - App
              </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <Tabs isFitted variant="soft-rounded">
                <TabList mb="1em">
                  <Tab>Login</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Homepage;
