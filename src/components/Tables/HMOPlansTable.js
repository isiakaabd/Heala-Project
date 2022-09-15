import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { Loader } from "components/Utilities";
import { EmptyTable } from "components/layouts";
import { isSelected } from "helpers/isSelected";
import { useStyles } from "styles/hmoPageStyles";
import MainModal from "components/modals/MainModal";
import { DeleteOrDisable } from "components/modals";
import { getPlans } from "components/graphQL/useQuery";
import { HMOPlanRow } from "components/Rows/HMOPlanRow";
import TableLayout from "components/layouts/TableLayout";
import { useActions } from "components/hooks/useActions";
import { DELETE_PLAN } from "components/graphQL/Mutation";
import { handleSelectedRows } from "helpers/selectedRows";
import { getDynamicSearchPlaceholder } from "helpers/func";
import CompoundSearch from "components/Forms/CompoundSearch";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hmoPlansTableHeader } from "components/Utilities/tableHeaders";
import {
  defaultPageInfo,
  plansSearchFilterOptions,
  plansSearchOptions,
} from "../../helpers/mockData";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import CreateEditHMOPlans from "components/Forms/CreateEditHMOPlans";

const HMOPlansTable = ({ PlansQuery }) => {
  /* const theme = useTheme(); */
  const classes = useStyles();
  const [id, setId] = useState(null);
  const { watchFunction } = useAlert();
  const [plans, setPlans] = useState([]);
  const [deletePlan] = useMutation(DELETE_PLAN);
  const [editModal, setEditModal] = useState(false);
  const [editPlanData, setEditPlanData] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = React.useState({});
  const { fetchPlans, loading, data, refetch, variables, newVariables } =
    PlansQuery;
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  useEffect(() => {
    fetchPlans({
      variables: {
        first: pageInfo?.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchPlans, pageInfo]);

  useEffect(() => {
    if (data) {
      setPlans(data.getPlans.plan);
      setPageInfo(data.getPlans.pageInfo);
      (data.getPlans.plan || []).map((plan) => {
        const newIsDeleting = isDeleting;
        setIsDeleting({ [plan._id]: false, ...newIsDeleting });
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // delete plan
  const onConfirmDelPlan = async () => {
    const newIsDeleting = isDeleting;
    const stopDeleting = () => {
      setId(null);
      newIsDeleting[id] = false;
      setIsDeleting({ ...newIsDeleting });
    };
    try {
      newIsDeleting[id] = true;
      setIsDeleting({ ...newIsDeleting });
      const deletePlanRes = deletePlan({
        variables: { id },
        refetchQueries: [{ query: getPlans }],
      });

      watchFunction(
        "Plan deleted succesfully",
        "Couldn't delete plan.",
        deletePlanRes
      ).then(() => {
        refetch();
        stopDeleting();
      });
    } catch (error) {
      stopDeleting();
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Grid>
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
          search={
            <CompoundSearch
              queryParams={{
                fetchData: fetchPlans,
                variables,
                loading,
                newVariables: newVariables,
              }}
              searchState={{
                value: "",
                filterBy: "name",
              }}
              setPageInfo={() => null}
              setProfiles={() => null}
              getSearchPlaceholder={(filterBy) =>
                getDynamicSearchPlaceholder(filterBy, plansSearchFilterOptions)
              }
              filterOptions={plansSearchOptions}
            />
          }
        >
          {loading ? (
            <Loader />
          ) : plans.length > 0 ? (
            /* ================= HMO TABLE ================= */
            <Grid
              container
              item
              direction="column"
              overflow="hidden"
              maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
            >
              <EnhancedTable
                headCells={hmoPlansTableHeader}
                rows={plans}
                paginationLabel="subscription per page"
                hasCheckbox={true}
                changeLimit={async (e) => {
                  await changeTableLimit(fetchPlans, { first: e });
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  await handlePageChange(fetchPlans, page, pageInfo, {});
                }}
              >
                {plans.map((row, index) => {
                  const isItemSelected = isSelected(row?._id, selectedRows);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const { _id, name, amount, description, allowedFeatures } =
                    row;
                  const editFormValues = {
                    id: _id,
                    name,
                    amount,
                    description,
                    accessType: "",
                    consultation: allowedFeatures?.consultation || "",
                  };
                  return (
                    <HMOPlanRow
                      key={`${_id}-${index}`}
                      plan={row}
                      isItemSelected={isItemSelected}
                      handleSelectedRows={handleSelectedRows}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      labelId={labelId}
                      handleDeleteOpenDialog={() => {
                        setId(row?._id);
                        setdeleteModal(true);
                      }}
                      handleEditOpenDialog={() => {
                        setEditPlanData(editFormValues);
                        setEditModal(true);
                      }}
                      deleting={isDeleting[row._id]}
                    />
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={hmoPlansTableHeader}
              paginationLabel="Users per page"
            />
          )}
        </TableLayout>
      </Grid>
      <Grid>
        {/* EDIT PLAN MODAL */}
        <MainModal
          isOpen={editModal}
          headerText="Edit plan"
          rowSpacing={5}
          setIsOpen={() => setEditModal(false)}
        >
          <CreateEditHMOPlans
            initialValues={editPlanData}
            type="edit"
            onSuccess={() => {
              setEditModal(false);
              refetch();
            }}
          />
        </MainModal>

        {/* DELETE PLAN MODAL */}
        <DeleteOrDisable
          open={deleteModal}
          setOpen={setdeleteModal}
          title="Delete Plan"
          onConfirm={onConfirmDelPlan}
          confirmationMsg="delete plan"
          btnValue="Delete"
        />
      </Grid>
    </Grid>
  );
};

HMOPlansTable.propTypes = {
  PlansQuery: PropTypes.object.isRequired,
};

export default HMOPlansTable;
