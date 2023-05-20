import React from "react";
import Form from "./Components/Form/Form";
import Images from "./Components/Images/Images";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutaction } from "./Redux/actions/imageAction";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, logoutsuccess } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [dispatch, error, logoutsuccess, isAuthenticated, navigate]);
  const logoutHandler = async (e) => {
    e.preventDefault();
    dispatch(logoutaction());
  };
  return (
    <div className="App">
      <Button onClick={logoutHandler} colorScheme="teal" variant="outline">
        Logout
      </Button>
      <Images />
      <Form />
    </div>
  );
};

export default Home;
