import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearerr, forgotPassword } from "../../Redux/actions/imageAction";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../Redux/actions/imageAction";
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
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password, confirmPassword));
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

    if (success) {
      toast({
        title: "Password Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    }
  }, [dispatch, error, toast, success, navigate]);

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
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>confirmPassword</FormLabel>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={resetPasswordSubmit}
                    isLoading={loading}
                  >
                    Change Password
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

export default ResetPassword;
