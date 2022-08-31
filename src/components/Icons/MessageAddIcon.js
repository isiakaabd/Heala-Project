import { SvgIcon } from "@mui/material";
import React from "react";

function MessageAddIcon(props) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <path
        d="M13.3332 1.66602H6.6665C3.33317 1.66602 1.6665 3.33268 1.6665 6.66602V17.4993C1.6665 17.9577 2.0415 18.3327 2.49984 18.3327H13.3332C16.6665 18.3327 18.3332 16.666 18.3332 13.3327V6.66602C18.3332 3.33268 16.6665 1.66602 13.3332 1.66602Z"
        stroke="#757886"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.0835 10H12.9168"
        stroke="#757886"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.9173V7.08398"
        stroke="#757886"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default MessageAddIcon;
