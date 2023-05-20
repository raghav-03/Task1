import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  editimageaction,
  oneimageaction,
  clearerr,
} from "../../Redux/actions/imageAction";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { useToast } from "@chakra-ui/toast";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, image } = useSelector((state) => state.oneImage);
  const params = useParams();
  const { imgName, imgDetails, imgURL } = image;
  const [formdata, setformdata] = useState({
    imgName: "",
    imgDetails: "",
    imgURL: "",
  });
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearerr());
    }
    dispatch(oneimageaction(params.id));
  }, [dispatch, error]);
  useEffect(() => {
    setformdata({
      imgName: imgName,
      imgDetails: imgDetails,
      imgURL: imgURL,
    });
  }, [image]);

  // Used to change the data fetched from editform
  const changedata = (e) => {
    const fieldname = e.target.name;
    const value = e.target.value;
    // fetch old data
    const newformdata = { ...formdata };
    // update given field with value
    newformdata[fieldname] = value;
    // updating data
    setformdata(newformdata);
  };
  // function made to add new data to table
  const editdata = (e) => {
    e.preventDefault();
    // call axios
    dispatch(editimageaction(formdata, params.id));
    navigate(`/show/${params.id}`);
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
        <div className="card-form-edit">
          <form className="signup" onSubmit={editdata}>
            <div className="form-title">Add a new Image</div>
            <div className="form-body">
              <div className="row">
                <input
                  type="text"
                  placeholder="Image Name*"
                  name="imgName"
                  value={formdata.imgName}
                  onChange={changedata}
                  autoComplete="off"
                  readOnly={true}
                />
                <input
                  type="text"
                  placeholder="Image URL*"
                  name="imgURL"
                  value={formdata.imgURL}
                  onChange={changedata}
                  autoComplete="off"
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  placeholder="Image Details*"
                  name="imgDetails"
                  value={formdata.imgDetails}
                  onChange={changedata}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="rule"></div>
            <div className="form-footer">
              <button type="submit">
                <span style={{ color: "white" }}>Edit Data</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Edit;
