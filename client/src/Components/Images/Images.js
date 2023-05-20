import React, { Fragment, useEffect, useState } from "react";
import "./Images.css";
import { imageaction, clearerr } from "../../Redux/actions/imageAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
const Images = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { error, loading, allimages, perpageitem, filteredimagecount } =
    useSelector((state) => state.Image);
  const { success } = useSelector((state) => state.newImage);
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearerr());
    }

    dispatch(imageaction(params.keyword, currentPage));
  }, [dispatch, error, success, params.keyword, currentPage]);
  const navigate = useNavigate();
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
        <div className="gallery gallery__content--flow">
          {allimages &&
            allimages.map((image) => {
              return (
                <Link to={`/show/${image._id}`} key={image._id}>
                  <figure>
                    <img src={image.imgURL} alt={image.imgName} />
                    <figcaption className="header__caption" role="presentation">
                      <h1 className="title title--primary">{image.imgName}</h1>
                    </figcaption>
                  </figure>
                </Link>
              );
            })}
          {perpageitem < filteredimagecount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={perpageitem}
                totalItemsCount={filteredimagecount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Images;
