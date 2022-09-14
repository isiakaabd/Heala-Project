import React from "react";
import t from "prop-types";
import { useCopy } from "./hooks/useCopy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Copy = ({ text, name, ...props }) => {
  const { copyToClipBoard } = useCopy();

  return (
    <button
      {...props}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => copyToClipBoard(text, name)}
    >
      <ContentCopyIcon />
    </button>
  );
};

Copy.propTypes = {
  name: t.string,
  text: t.string,
};

export default Copy;
