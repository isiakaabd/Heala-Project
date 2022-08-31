import { SvgIcon } from "@mui/material";
import React from "react";

function SearchIcon(props) {
  return (
    <SvgIcon viewBox="0 0 16 16" fill="none" {...props}>
      <mask
        id="mask0_8172_55233"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="14"
        height="14"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.33334 1.33398H14.3179V14.3187H1.33334V1.33398Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_8172_55233)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.82589 2.33398C4.79722 2.33398 2.33322 4.79732 2.33322 7.82598C2.33322 10.8547 4.79722 13.3187 7.82589 13.3187C10.8539 13.3187 13.3179 10.8547 13.3179 7.82598C13.3179 4.79732 10.8539 2.33398 7.82589 2.33398ZM7.82589 14.3187C4.24589 14.3187 1.33322 11.406 1.33322 7.82598C1.33322 4.24598 4.24589 1.33398 7.82589 1.33398C11.4059 1.33398 14.3179 4.24598 14.3179 7.82598C14.3179 11.406 11.4059 14.3187 7.82589 14.3187Z"
          fill="white"
        />
      </g>
      <mask
        id="mask1_8172_55233"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="11"
        y="11"
        width="4"
        height="5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4933 11.8047H14.8427V15.1479H11.4933V11.8047Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_8172_55233)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3428 15.1479C14.2155 15.1479 14.0875 15.0992 13.9895 15.0019L11.6402 12.6592C11.4448 12.4639 11.4442 12.1472 11.6395 11.9519C11.8342 11.7552 12.1508 11.7565 12.3468 11.9505L14.6961 14.2939C14.8915 14.4892 14.8921 14.8052 14.6968 15.0005C14.5995 15.0992 14.4708 15.1479 14.3428 15.1479Z"
          fill="white"
        />
      </g>
    </SvgIcon>
  );
}

export default SearchIcon;
