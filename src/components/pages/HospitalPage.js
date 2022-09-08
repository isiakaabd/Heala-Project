import React, { useEffect, useState } from "react";
import { EmptyTable, NoData } from "components/layouts";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  TableCell,
  TableRow,
} from "@mui/material";
import AddProviderModal from "components/Forms/AddProviderModal";
import FormikControl from "components/validation/FormikControl";
import { Formik, Form } from "formik";
import { addDoctorValidationSchema } from "helpers/validationSchemas";
import CompoundSearch from "components/Forms/CompoundSearch";
import { Link, useParams } from "react-router-dom";
import { CustomButton, Loader, Modals } from "components/Utilities";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
import { regeneratePartnerProfileUrl } from "components/graphQL/Mutation";
import { useActions } from "components/hooks/useActions";
import { searchOptions } from "helpers/mockData";
import { getSearchPlaceholder } from "helpers/func";
import TableLayout from "components/layouts/TableLayout";

const HospitalPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const { patientConsultation } = useActions();
  const [regenerate, { data: daa }] = useMutation(regeneratePartnerProfileUrl);
  const [hospitals, setHospitals] = useState([]);
  const darkButtonType = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [fetchHospitals, { loading, error, variables }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: id },
    }
  );
  const onSubmit = () => console.log("onSubmit");
  const [openAddHcp, setOpenAddHcp] = useState(false);
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
    <>
      <Grid item flex={1} container direction="column" rowGap={2}>
        <Grid item container justifyContent="flex-end">
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add Provider"
            type={darkButtonType}
            onClick={() => setOpenAddHcp(true)}
          />
        </Grid>
        <TableLayout
          search={
            <CompoundSearch
              queryParams={{
                fetchData: fetchHospitals,
                variables,
                loading,
                newVariables: {},
              }}
              setPageInfo={(data) =>
                setPageInfo(data?.profiles?.pageInfo || {})
              }
              setProfiles={(data) => setHospitals(data?.profiles?.data || [])}
              getSearchPlaceholder={(filterBy) =>
                getSearchPlaceholder(filterBy)
              }
              filterOptions={searchOptions}
            />
          }
        >
          {hospitals.length > 0 ? (
            /* ================= HMO TABLE ================= */
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
                {hospitals.map((row) => {
                  const {
                    _id,
                    profileUrl,
                    doctorsCount,
                    userCount,
                    partnersCount,
                    name,
                  } = row;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={_id}
                      style={{ cursor: "pointer" }}
                      onClick={() => patientConsultation(_id)}
                    >
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
                          <span style={{ fontSize: "1.25rem" }}>{name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Link
                          to={`/user-type/hospital/${id}/patients/${_id}`}
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
                        <Link
                          to={`/user-type/hospital/${id}/${_id}`}
                          className={classes.link}
                        >
                          <Typography
                            variant="h3"
                            classes={{ root: classes.title }}
                          >
                            {doctorsCount ? doctorsCount : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Link
                          to={`/user-type/hospital/${id}/partners/${_id}`}
                          className={classes.link}
                        >
                          <Typography
                            variant="h3"
                            classes={{ root: classes.title }}
                          >
                            {partnersCount ? partnersCount : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>

                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{
                          color: theme.palette.common.grey,

                          width: "15%",
                        }}
                      >
                        {profileUrl ? (
                          <Typography
                            style={{
                              color: theme.palette.common.grey,
                              maxWidth: "3rem",
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
                            sx={{ width: "50%" }}
                            className={`${classes.tableBtn} ${classes.redBtn}`}
                            // onClick={() => handleGenerateLink(_id)}
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
        </TableLayout>
      </Grid>

      <AddProviderModal
        openAddHcp={openAddHcp}
        handleClose={() => setOpenAddHcp(false)}
        buttonType={buttonType}
        id={id}
        pushTo={`/user-type/hospital/${id}`}
      />
    </>
  );
};

export default HospitalPage;
