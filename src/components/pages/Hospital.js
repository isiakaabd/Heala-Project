import React, { useEffect, useState } from "react";
import { EmptyTable, NoData } from "components/layouts";
import {
  Grid,
  Button,
  Typography,
  Avatar,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { EnhancedTable } from "components/layouts";
import { useStyles } from "styles/partnersPageStyles";
import Copy from "components/Copy";
import { trucateProfileLink } from "helpers/filterHelperFunctions";
import { hospitalTableHeadCells } from "components/Utilities/tableHeaders";
import { defaultPageInfo } from "helpers/mockData";
import { trucateString } from "helpers/filterHelperFunctions";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getProviders, getPartners } from "components/graphQL/useQuery";
import { Loader } from "components/Utilities";
import { regeneratePartnerProfileUrl } from "components/graphQL/Mutation";

const Hospital = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [regenerate, { data: daa }] = useMutation(regeneratePartnerProfileUrl);
  const [hospitals, setHospitals] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const userTypeId = "61ed2354e6091400135e3d94";
  const [fetchHospitals, { loading, error }] = useLazyQuery(getProviders, {
    variables: { userTypeId },
  });

  useEffect(() => {
    fetchHospitals()
      .then(({ data }) => {
        if (data) {
          setHospitals(data?.getProviders?.provider || []);
          setPageInfo(data?.getProviders?.pageInfo || {});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchHospitals]);

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <Grid item flex={1} container direction="column" rowGap={2}>
      {hospitals.length > 0 ? (
        <Grid
          container
          item
          direction="column"
          overflow="hidden"
          maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
        >
          <EnhancedTable
            headCells={hospitalTableHeadCells}
            rows={hospitals}
            paginationLabel="Hospitals per page"
            hasCheckbox={false}
            dataPageInfo={pageInfo}
          >
            {hospitals.map((row, index) => {
              const { _id, name, icon, profileUrl, userCount, doctorCount } =
                row;

              //   const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{ maxWidth: "20rem" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "left",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt={`Display Photo of ${name}`}
                          src={icon}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{name}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Link
                      to={`/patients/${_id}/filter`}
                      className={classes.link}
                    >
                      <Typography
                        variant="h3"
                        classes={{ root: classes.title }}
                      >
                        {userCount ? userCount : "NA"}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Link to={`/hcps/${_id}/filter`} className={classes.link}>
                      <Typography
                        variant="h3"
                        classes={{ root: classes.title }}
                      >
                        {doctorCount ? doctorCount : "NA"}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Link
                      to={`/partners/${_id}/filter`}
                      className={classes.link}
                    >
                      <Typography
                        variant="h3"
                        classes={{ root: classes.title }}
                      >
                        {doctorCount ? doctorCount : "NA"}
                      </Typography>
                    </Link>
                  </TableCell>

                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{
                      color: theme.palette.common.grey,
                      maxWidth: "8rem",
                    }}
                  >
                    {profileUrl ? (
                      <Typography
                        style={{
                          color: theme.palette.common.grey,
                          maxWidth: "8rem",
                        }}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {trucateProfileLink(profileUrl)}
                        <div style={{ marginLeft: "1rem" }}>
                          <Copy name="Profile Link" text={profileUrl} />
                        </div>
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                      >
                        Generate Link
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable
          headCells={hospitalTableHeadCells}
          paginationLabel="Hospitals per page"
        />
      )}
    </Grid>
  );
};

export default Hospital;
