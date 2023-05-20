import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearerr, forgotPassword } from "../../Redux/actions/imageAction";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
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
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }

    if (message) {
      toast({
        title: "Reset Token Sent Succesfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, [dispatch, error, alert, message]);

  return (
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
            <TabList mb="1em"></TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing="5px">
                  <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={forgotPasswordSubmit}
                    isLoading={loading}
                  >
                    Send Request
                  </Button>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
