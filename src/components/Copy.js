import React from "react";
import t from "prop-types";
import { useCopy } from "./hooks/useCopy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Copy = ({ text, name, ...props }) => {
  const { copyToClipBoard } = useCopy();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => copyToClipBoard(text, name)}
      {...props}
    >
      <ContentCopyIcon />
    </div>
  );
};

Copy.propTypes = {
  text: t.string,
  name: t.string,
};

export default Copy;
