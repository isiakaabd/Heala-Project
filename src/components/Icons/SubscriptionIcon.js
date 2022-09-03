import { SvgIcon } from "@mui/material";
import React from "react";

function SubscriptionIcon(props) {
  return (
    <SvgIcon viewBox="0 0 22 22" {...props}>
      <path
        d="M7.94922 13.1341C7.94922 14.3166 8.85672 15.2699 9.98422 15.2699H12.2851C13.2659 15.2699 14.0634 14.4357 14.0634 13.4091C14.0634 12.2907 13.5776 11.8966 12.8534 11.6399L9.15922 10.3566C8.43505 10.0999 7.94922 9.70573 7.94922 8.5874C7.94922 7.56073 8.74672 6.72656 9.72755 6.72656H12.0284C13.1559 6.72656 14.0634 7.6799 14.0634 8.8624"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 5.5V16.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        /* stroke-linejoin="round" */
      />
      <path
        d="M10.9999 20.1654C16.0625 20.1654 20.1666 16.0613 20.1666 10.9987C20.1666 5.93609 16.0625 1.83203 10.9999 1.83203C5.93731 1.83203 1.83325 5.93609 1.83325 10.9987C1.83325 16.0613 5.93731 20.1654 10.9999 20.1654Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default SubscriptionIcon;
