import React, { Fragment } from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/${keyword}`);
    } else {
      navigate(`/`);
    }
  };
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, logoutsuccess } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [dispatch, error, logoutsuccess, isAuthenticated, navigate]);
  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Image ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
