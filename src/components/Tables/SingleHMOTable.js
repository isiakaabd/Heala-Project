import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { useParams } from "react-router-dom";
import { Loader } from "components/Utilities";
import { useStyles } from "styles/hmoPageStyles";
import { EmptyTable, NoData } from "components/layouts";
import SingleHMORow from "components/Rows/SingleHMORow";
import { useMutation, NetworkStatus } from "@apollo/client";

import { getDynamicSearchPlaceholder } from "helpers/func";
import TableLayout from "components/layouts/TableLayout";
import { getEnrolles } from "components/graphQL/useQuery";
import CompoundSearch from "components/Forms/CompoundSearch";
import EnhancedTable from "components/layouts/EnhancedTable";
import { deleteEnrollee } from "components/graphQL/Mutation";
import ConfirmDelete from "components/modals/DeleteOrDisable";
import SingleHMOFilters from "components/Forms/Filters/SingleHMOFilters";
import {
  defaultPageInfo,
  hmoSearchFilterOptions,
  hmoSearchOptions,
} from "../../helpers/mockData";
import { singleHmoTableHeadCells } from "components/Utilities/tableHeaders";
import AddEditHMOEnrolleeModal from "components/modals/AddEditHMOEnrolleeModal";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import EnrolleeProfileModal from "components/modals/EnrolleeProfileModal";

const SingleHMOTable = ({ enrolleesParams }) => {
  const classes = useStyles();
  const { hmoId } = useParams();
  const { displayAlert, getErrorMsg } = useAlert();
  const [editData, setEditData] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [editEnrolleeModal, setEditEnrolleeModal] = useState(false);
  const [profileDetailModal, setProfileDetailModal] = useState(false);
  const [enrolleeToDelete, setEnrolleeToDelete] = React.useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);
  const [deleteHMOEnrollee] = useMutation(deleteEnrollee, {
    refetchQueries: [{ query: getEnrolles }],
  });
  const {
    hmoEnrollees,
    setHmoEnrollees,
    pageInfo,
    setPageInfo,
    fetchEnrollees,
    error,
    loading,
    refetch,
    variables,
    networkStatus,
  } = enrolleesParams;

  React.useEffect(() => {
    (hmoEnrollees || []).map((enrollee) => {
      const newIsDeleting = isDeleting;
      setIsDeleting({ [enrollee?._id]: false, ...newIsDeleting });
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hmoEnrollees]);

  const refreshData = () => {
    refetch({
      variables: {
        providerId: hmoId,
        first: 10,
      },
    })
      .then(({ data }) => {
        setHmoEnrollees(data?.getEnrollees?.data || []);
        setPageInfo(data?.getEnrollees?.pageInfo || {});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setHmoEnrollees(data?.getEnrollees?.data || []);
        setPageInfo(data?.getEnrollees?.pageInfo || defaultPageInfo);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  if (error) return <NoData error={error} />;
  return (
    <Grid item flex={1} container direction="column" rowGap={2}>
      <Grid
        item
        container
        spacing={2}
        className={classes.searchFilterContainer}
      >
        <Grid item container flexWrap="wrap" spacing={4}></Grid>
      </Grid>
      <TableLayout
        filters={
          <SingleHMOFilters
            setHmoEnrollees={setHmoEnrollees}
            setPageInfo={setPageInfo}
            queryParams={{ variables, fetchEnrollees, refetch }}
          />
        }
        search={
          <CompoundSearch
            queryParams={{
              fetchData: fetchEnrollees,
              variables,
              loading,
              newVariables: { providerId: hmoId },
            }}
            searchState={{
              value: "",
              filterBy: "hmoId",
            }}
            setPageInfo={(data) =>
              setPageInfo(data?.getEnrollees?.pageInfo || {})
            }
            setProfiles={(data) =>
              setHmoEnrollees(data?.getEnrollees?.data || [])
            }
            getSearchPlaceholder={(filterBy) =>
              getDynamicSearchPlaceholder(filterBy, hmoSearchFilterOptions)
            }
            filterOptions={hmoSearchOptions}
          />
        }
      >
        {loading ? (
          <Loader />
        ) : networkStatus === NetworkStatus.refetch ? (
          <Loader />
        ) : hmoEnrollees.length > 0 ? (
          /* ================= HMO TABLE ================= */
          <Grid
            container
            item
            direction="column"
            overflow="hidden"
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <EnhancedTable
              headCells={singleHmoTableHeadCells}
              rows={hmoEnrollees}
              paginationLabel="Enrollees per page"
              hasCheckbox={false}
              dataPageInfo={pageInfo}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchEnrollees, {
                  first: e,
                });
                await setTableData(res, "Failed to change table limit.");
              }}
              handlePagination={async (page) => {
                const res = handlePageChange(
                  fetchEnrollees,
                  page,
                  pageInfo,
                  {}
                );
                await setTableData(res, "Failed to change page.");
              }}
            >
              {hmoEnrollees.map((row, index) => {
                const { _id } = row;
                return (
                  <SingleHMORow
                    key={index}
                    index={index}
                    rowData={row}
                    setEditData={setEditData}
                    isDeleting={isDeleting[_id]}
                    setEnrolleeIdToDelete={() => setEnrolleeToDelete(_id)}
                    openEditModal={() => setEditEnrolleeModal(true)}
                    openConfirmModal={() => setConfirmDeleteModal(true)}
                    openProfileDetailsModal={() => {
                      setProfileDetailModal(true);
                      setProfileDetails(row);
                    }}
                  />
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={singleHmoTableHeadCells}
            paginationLabel="Enrollees per page"
          />
        )}
      </TableLayout>

      {/* ==== PROFILE DETAILS MODAL ===== */}
      <EnrolleeProfileModal
        isOpen={profileDetailModal}
        setIsOpen={setProfileDetailModal}
        profileData={profileDetails}
      />

      {/*  ======= CONFIRM DELETE ======== */}
      <ConfirmDelete
        open={confirmDeleteModal}
        setOpen={setConfirmDeleteModal}
        title="Delete Enrollee"
        btnValue="delete"
        onConfirm={async () => {
          setConfirmDeleteModal(false);
          const newIsDeleting = isDeleting;

          try {
            newIsDeleting[enrolleeToDelete] = true;
            setIsDeleting({ ...newIsDeleting });
            const { data } = await deleteHMOEnrollee({
              variables: {
                id: enrolleeToDelete,
              },
            });

            if (!data) {
              newIsDeleting[enrolleeToDelete] = false;
              setIsDeleting({ ...newIsDeleting });
              throw Error("Couldn't delete enrollee");
            }
            displayAlert("success", "Deleted enrollee successfully.");
            refreshData();
            newIsDeleting[enrolleeToDelete] = false;
            setIsDeleting({ ...newIsDeleting });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            const errMsg = getErrorMsg(error);
            displayAlert("error", errMsg);
            newIsDeleting[enrolleeToDelete] = false;
            setIsDeleting({ ...newIsDeleting });
          }
        }}
        confirmationMsg="Are you sure you want to delete"
        onCancel={() => {
          setConfirmDeleteModal(false);
        }}
      />

      {/* EDIT ENROLLEE MODAL */}
      <AddEditHMOEnrolleeModal
        isOpen={editEnrolleeModal}
        setIsOpen={setEditEnrolleeModal}
        type="edit"
        initialValues={editData}
        refetchData={() => refreshData()}
      />
    </Grid>
  );
};

SingleHMOTable.propTypes = {
  enrolleesParams: PropTypes.object.isRequired,
};

export default SingleHMOTable;
