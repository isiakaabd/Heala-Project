import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const ScrollToView = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(100, 100);
  }, [location]);
  return <main>{props.children}</main>;
};

ScrollToView.propTypes = {
  children: PropTypes.node,
};

export default ScrollToView;
