import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { H1 } from "components/Utilities/Texts";

const CardStyle = styled.div`
  background: ${(props) => props.bg || "#FFFFFF"};
  margin-top: 40px;
  width: 475px;
  color: ${(props) => props.color || "#442ED0"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  height: ${(props) => props.h || "481px"};
  border-radius: 10px;
  box-shadow: 0px 5px 19px rgba(13, 2, 78, 0.08);
`;

export const Card = ({ title, width, children }) => {
  return (
    <CardStyle width={width} className="p-4 cursor-pointer">
      <div className="bg-gray-800 border-blue-300 border-b-2 pr-4">
        <H1 color="#2D2F39" fontSize="20px">
          {title}
        </H1>
      </div>
      <div>{children}</div>
    </CardStyle>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.width,
  children: PropTypes.children,
  description: PropTypes.description,
  className: PropTypes.className,
};
