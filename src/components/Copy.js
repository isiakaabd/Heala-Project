import React from "react";
import t from "prop-types";
import { useCopy } from "./hooks/useCopy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Copy = ({ text, name }) => {
  const { copyToClipBoard } = useCopy();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => copyToClipBoard(text, name)}
    >
      <ContentCopyIcon />
    </div>
  );
};

Copy.propTypes = {
  text: t.string.isRequired,
  name: t.string,
};

export default Copy;
