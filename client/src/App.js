import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Image from "./Components/Image/Image";
import Edit from "./Components/Edit/Edit";
import Search from "./Components/Search/Search";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect } from "react";
import { loadcredentials, clearerr } from "./Redux/actions/imageAction";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import Homepage from "./Components/Home/Homepage";
import ProtectedRoute from "../src/Route/ProtectedRoute";
import ForgotPassword from "./Components/Authentication/ForgotPassword.js";
import ResetPassword from "./Components/Authentication/ResetPassword";
function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const toast = useToast();
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
  }, [dispatch, error]);
  useEffect(() => {
    dispatch(loadcredentials());
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/image" element={<Home />} />
        <Route path="/image:keyword" element={<Home />} />
        <Route exact path="/show/:id" element={<Image />} />
        <Route exact path="/:id/edit" element={<Edit />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpass/:token" element={<ResetPassword />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
