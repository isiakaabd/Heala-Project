import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, TableCell, TableRow } from "@mui/material";
import AddProviderModal from "components/Forms/AddProviderModal";
import CompoundSearch from "components/Forms/CompoundSearch";
import { Link, useParams } from "react-router-dom";
import { CustomButton, Loader } from "components/Utilities";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useTheme } from "@mui/material/styles";
import { EnhancedTable, EmptyTable, NoData } from "components/layouts";
import { useStyles } from "styles/partnersPageStyles";
import Copy from "components/Copy";
import { hospitalTableHeadCells10 } from "components/Utilities/tableHeaders";
import {
  changeTableLimit,
  handlePageChange,
  trucateProfileLink,
} from "helpers/filterHelperFunctions";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getProviders } from "components/graphQL/useQuery";
import { regenerateProviderProfileUrl } from "components/graphQL/Mutation";
import { searchOptions, defaultPageInfo } from "helpers/mockData";
import { getSearchPlaceholder } from "helpers/func";
import TableLayout from "components/layouts/TableLayout";

const HMOEnrolle = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
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
  const [fetchHospitals, { loading, data, error, variables }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: id },
    }
  );

  const [openAddHcp, setOpenAddHcp] = useState(false);
  const [ids, setIds] = useState("");
  useEffect(() => {
    fetchHospitals();
    try {
      if (data) {
        setHospitals(data?.getProviders?.provider || []);
        setPageInfo(data?.getProviders?.pageInfo || {});
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [fetchHospitals, data]);
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

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data?.getProviders?.pageInfo || defaultPageInfo);
        setHospitals(data?.getProviders?.provider || []);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setHospitals("error", errMsg);
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
                headCells={hospitalTableHeadCells10}
                rows={hospitals}
                paginationLabel="Providers per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const res = changeTableLimit(fetchHospitals, {
                    first: e,
                  });
                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
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
                    userCount,
                    profileUrl,
                    partnerCount,
                    enrolleeCount,
                    name,
                  } = row;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={_id}
                      style={{ cursor: "pointer" }}
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
                          to={`/user-type/hmo/${id}/${_id}/users`}
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
                          to={`/user-type/hmo/${id}/${_id}/enrollee`}
                          className={classes.link}
                        >
                          <Typography
                            variant="h3"
                            classes={{ root: classes.title }}
                          >
                            {enrolleeCount ? enrolleeCount : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Link
                          to={`/user-type/hmo/${id}/${_id}/partners`}
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
                        style={{ maxWidth: "20rem" }}
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
                        ) : (load && ids === _id) || loading ? (
                          <Grid item container justifyContent="left">
                            <Loader />
                          </Grid>
                        ) : (
                          <div style={{ width: "50%" }}>
                            <Button
                              variant="contained"
                              disableRipple
                              sx={{ width: "50%" }}
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
              headCells={hospitalTableHeadCells10}
              paginationLabel="Providers per page"
            />
          )}
        </TableLayout>
      </Grid>

      <AddProviderModal
        openAddHcp={openAddHcp}
        handleClose={() => setOpenAddHcp(false)}
        buttonType={buttonType}
        id={id}
        pushTo={`/user-type/hmo/${id}`}
      />
    </>
  );
};

export default HMOEnrolle;
