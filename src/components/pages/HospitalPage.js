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
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
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
import { regenerateProviderProfileUrl } from "components/graphQL/Mutation";
import { useActions } from "components/hooks/useActions";
import { searchOptions } from "helpers/mockData";
import { getSearchPlaceholder } from "helpers/func";
import TableLayout from "components/layouts/TableLayout";

const HospitalPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const { patientConsultation } = useActions();
  const [regenerate, { loading: load }] = useMutation(
    regenerateProviderProfileUrl
  );
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

  const [ids, setIds] = useState("");
  const [fetchHospitals, { loading, error, data, variables }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: id },
    }
  );
  const handleGenerateLink = (id) => {
    setIds(id);
    regenerate({
      variables: {
        id,
      },
      refetchQueries: [
        getProviders,
        {
          variables: {
            userTypeId: id,
          },
        },
      ],
    });
  };

  const [openAddHcp, setOpenAddHcp] = useState(false);

  useEffect(() => {
    fetchHospitals();
    try {
      if (data) {
        setHospitals(data?.getProviders?.provider || []);
        setPageInfo(data?.getProviders?.pageInfo || {});
      }
    } catch (error) {
      console.error(error);
    }
  }, [data]);
  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setHospitals(data?.getProviders?.provider || []);
        setPageInfo(data?.getProviders?.pageInfo || {});
        setPageInfo(data?.profiles?.pageInfo || defaultPageInfo);
        // setProfiles(data?.profiles?.data || []);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // displayAlert("error", errMsg);
      });
  };

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
                changeLimit={async (e) => {
                  const res = changeTableLimit(fetchHospitals, {
                    first: e,
                  });
                  await setTableData(res, "Failed to change table limit.");
                }}
                handlePagination={async (page) => {
                  const res = handlePageChange(
                    fetchHospitals,
                    page,
                    pageInfo,
                    {}
                  );
                  await setTableData(res, "Failed to change page.");
                }}
              >
                {hospitals.map((row) => {
                  const {
                    _id,
                    profileUrl,
                    doctorCount,
                    userCount,
                    partnerCount,
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
                            {userCount === 0
                              ? userCount
                              : userCount > 0
                              ? userCount
                              : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Link
                          to={`/user-type/hospital/${id}/doctors/${_id}`}
                          className={classes.link}
                        >
                          <Typography
                            variant="h3"
                            classes={{ root: classes.title }}
                          >
                            {doctorCount === 0
                              ? doctorCount
                              : doctorCount > 0
                              ? doctorCount
                              : "NA"}
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
                            {partnerCount === 0
                              ? partnerCount
                              : partnerCount > 0
                              ? partnerCount
                              : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>

                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{
                          color: theme.palette.common.grey,

                          width: "30rem",
                        }}
                      >
                        {profileUrl ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <Typography
                              variant="h3"
                              classes={{ root: classes.title }}
                            >
                              {trucateProfileLink(profileUrl, 20)}
                            </Typography>
                            <Copy name="Profile Link" text={profileUrl} />
                          </div>
                        ) : (load && ids === _id) ||
                          (loading && ids === _id) ? (
                          <Loader />
                        ) : (
                          <div style={{ width: "50%" }}>
                            <Button
                              variant="contained"
                              disableRipple
                              // sx={{ width: "30%" }}
                              className={`${classes.tableBtn} ${classes.redBtn}`}
                              onClick={() => handleGenerateLink(_id)}
                            >
                              Generate Link
                            </Button>
                          </div>
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
