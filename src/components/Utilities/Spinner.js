import React from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
const Spinner = ({ style }) => (
  <div style={style}>
    <Loader type="Watch" color="#00BFFF" height={50} width={50} />
  </div>
);
Spinner.propTypes = {
  style: PropTypes.object,
};
export default Spinner;
