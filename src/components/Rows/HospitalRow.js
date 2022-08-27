import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useStyles } from "styles/hospitalPageStyles";
import { Button, TableCell, TableRow } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProfileInfo from "components/Utilities/ProfileInfo";
import { trucateString } from "helpers/filterHelperFunctions";

const HospitalRow = ({ index, rowData }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { _id, name, plans, email, icon } = rowData;
  const labelId = `enhanced-table-checkbox-${index}`;
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
      <TableCell
        id={labelId}
        scope="row"
        align="left"
        className={classes.tableCell}
        style={{
          color: theme.palette.common.grey,
          textAlign: "left",
        }}
      >
        {_id ? trucateString(_id, 10, "front") : "No ID"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <ProfileInfo
          imgUrl={icon && icon}
          firstName={name ? name : "No name"}
          lastName=""
        />
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {email ? email : "No email"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {plans ? plans : "Null"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <Link to={`/plans/hospitals/${_id}`}>
          <Button className={classes.viewBtn} endIcon={<ArrowForwardIosIcon />}>
            View Plans
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

HospitalRow.propTypes = {
  index: PropTypes.number.isRequired,
  rowData: PropTypes.object.isRequired,
};

export default HospitalRow;
