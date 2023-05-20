import React, { Fragment, useEffect } from "react";
import {
  oneimageaction,
  clearerr,
  deleteimageaction,
} from "../../Redux/actions/imageAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Image.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/react";
const Image = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, image } = useSelector((state) => state.oneImage);
  const { success } = useSelector((state) => state.editimage);

  const params = useParams();
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearerr());
    }
    dispatch(oneimageaction(params.id));
  }, [dispatch, error, success]);
  const Editclicked = (e) => {
    e.preventDefault();
    navigate(`/${image._id}/edit`);
  };
  const Deleteclicked = (e) => {
    e.preventDefault();
    console.log(params.id);
    dispatch(deleteimageaction(params.id));
    navigate(`/`);
  };
  const { isAuthenticated, logoutsuccess } = useSelector((state) => state.user);
  const toast = useToast();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [dispatch, error, logoutsuccess, isAuthenticated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div id="container">
          <div className="product-details">
            <h1>{image && image.imgName}</h1>
            <p className="information">{image && image.imgDetails}</p>
            <Button onClick={Editclicked} colorScheme="teal" variant="ghost">
              Edit
            </Button>
            <Button onClick={Deleteclicked} colorScheme="teal" variant="ghost">
              Delete
            </Button>
          </div>

          <div className="product-image">
            <img src={image && image.imgURL} alt={image && image.imgName} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Image;
