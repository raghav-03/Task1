import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { logoutaction } from "../../Redux/actions/imageAction";

const Navbar = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, logoutsuccess } = useSelector(
    (state) => state.user
  );
  return (
    <div className="navbar">
      <h1 className="logo">Image Gallery</h1>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>

        <li>
          <Link to={`/search`}>Search</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
