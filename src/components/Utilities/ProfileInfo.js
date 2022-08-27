import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import displayPhoto from "assets/images/avatar.svg";

const ProfileInfo = ({ imgUrl, firstName, lastName }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ marginRight: "1rem" }}>
        <Avatar
          alt={`Display Photo of ${firstName}`}
          src={imgUrl ? imgUrl : displayPhoto}
          sx={{ width: 24, height: 24 }}
        />
      </span>
      <span style={{ fontSize: "1.25rem" }}>{`${firstName} ${lastName}`}</span>
    </div>
  );
};

ProfileInfo.propTypes = {
  imgUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default ProfileInfo;
