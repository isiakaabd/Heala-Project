// import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

export const H1 = styled.h1`
  font-size: ${(props) => props.fontSize || "36px"};
  font-family: ${(props) => props.fontFamily || "medium"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "27px"};
  }
`;

export const H2 = styled.h2`
  font-size: ${(props) => props.fontSize || "36px"};
  font-family: ${(props) => props.fontFamily || "medium"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "27px"};
  }
`;

export const H3 = styled.h3`
  font-size: ${(props) => props.fontSize || "24px"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "27px"};
  }
`;

export const H4 = styled.h4`
  font-size: ${(props) => props.fontSize || "20px"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "18px"};
  }
`;

export const H5 = styled.h5`
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  color: ${(props) => props.color};
`;

export const H6 = styled.h6`
  font-size: ${(props) => props.fontSize || "1em"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  color: ${(props) => props.color};
`;

export const P = styled.p`
  font-size: ${(props) => props.fontSize || "1em"};
  font-family: ${(props) => props.fontFamily || "regular"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "16px"};
  }
`;

export const SmallP = styled.p`
  font-family: ${(props) => props.fontFamily || "regular"}, sans-serif;
  font-weight: ${(props) => props.fontWeight || "300"};
  font-size: ${(props) => props.fontSize || "0.9rem"};
  letter-spacing: 0px;
  color: ${(props) => props.color};
`;

export const BigP = styled.p`
  font-size: ${(props) => props.fontSize || "54px"};
  font-family: ${(props) => props.fontFamily || "medium"}, sans-serif;
  color: ${(props) => props.color};

  @media (max-width: 600px) {
    font-size: ${(props) => props.smallSize || "36px"};
  }
`;

export const TextLink = styled.p`
  font-size: ${(props) => props.fontSize || "14px"};
  font-family: ${(props) => props.fontFamily || "regular"}, sans-serif;
  color: ${(props) => props.color};
`;
