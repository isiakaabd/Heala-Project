import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
import PropTypes from "prop-types";
import { Grid, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
// import displayPhoto from "assets/images/avatar.svg";
// import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import { dateMoment } from "components/Utilities/Time";
import { useQuery } from "@apollo/client";
import { verification } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",

    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.5rem",
      borderRadius: "1.5rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      // marginRight: "2rem",
    },
  },
}));

const ViewHCP = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const theme = useTheme();
  const { viewId } = useParams();
  const { loading, data, error } = useQuery(verification, { variables: { id: viewId } });
  const [respondData, setRespondData] = useState([]); //setRespondData
  console.log(respondData);

  useEffect(() => {
    try {
      if (data) {
        setRespondData(data.getVerification);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const classes = useStyles();

  useEffect(() => {
    setSelectedMenu(7);
    setSelectedSubMenu(8);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  // eslint-disable-next-line
  const {
    profileId,
    createdAt,
    qualification,
    license,
    yearbook,
    alumni_association,
    reference,
    // eslint-disable-next-line
  } = respondData;
  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton path="/verification" />
      </Grid>
      <Grid item></Grid>
      <Grid item container direction="column" className={classes.parentGridWrapper}>
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Patient:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{profileId ? profileId : "No Doctor"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Medical ID:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">2145</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Gender:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Female</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Date:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  {dateMoment(createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  File Upload:
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          // gap={12}
          sx={{ flexWrap: "nowrap", background: "blue" }}
        >
          <Grid item sx={{ background: "green" }}>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Qualification
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container width="60%" alignItems="center" gap={4} justifyContent="flex-start">
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="flex-start">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Degree:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {qualification ? qualification.degree : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="space-around">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Year:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{dateMoment(createdAt)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {qualification ? (
                <a
                  href={qualification.image}
                  rel="noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  <span>Qualification PNG</span>
                </a>
              ) : (
                <p className={classes.link}> No QUalification</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          width="100%"
          gap={12}
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  License
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container width="60%" alignItems="center" gap={4} justifyContent="flex-start">
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="flex-start">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Number:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{license ? license.number : "No Value"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="space-around">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Type:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{license ? license.type : "No Value"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {license ? (
                <a href={license.image} rel="noreferrer" target="_blank" className={classes.link}>
                  <span>license PNG</span>
                </a>
              ) : (
                <p className={classes.link}> No license</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          width="100%"
          gap={12}
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  YearBook
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container width="60%" alignItems="center" gap={4} justifyContent="flex-start">
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="flex-start">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Year:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {yearbook ? yearbook.graduation_year : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {yearbook ? (
                <a href={yearbook.image} rel="noreferrer" target="_blank" className={classes.link}>
                  <span>yearbook PNG</span>
                </a>
              ) : (
                <p className={classes.link}> No yearbook</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          // justifyContent="space-between"
          width="100%"
          gap={12}
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Alumni
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container width="60%" gap={3} alignItems="center" justifyContent="flex-start">
            <Grid item>
              {alumni_association ? (
                <a
                  href={alumni_association.image}
                  rel="noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  <span>{alumni_association.facebook_group_name}</span>
                </a>
              ) : (
                <p className={classes.link}> No alumni association</p>
              )}
            </Grid>
            <Grid item>
              {alumni_association ? (
                <a
                  href={alumni_association.image}
                  rel="noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  <span>{alumni_association.instagram_handle}</span>
                </a>
              ) : (
                <p className={classes.link}> No alumni association</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "2rem 3rem" }}
          alignItems="center"
          // justifyContent="space-between"
          width="100%"
          gap={12}
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  References
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container width="60%" alignItems="center" justifyContent="flex-start">
            <Grid item>
              <Grid container gap={2} alignItems="center" justifyContent="space-around">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Ref ID:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {reference ? reference.reference_code : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />
        <Grid
          item
          container
          style={{ padding: "4rem 3rem" }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item container sx={{ width: "20%" }}>
            <CustomButton
              title="Verify HCP"
              width="100%"
              type={buttonType}
              // onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ViewHCP.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewHCP;
