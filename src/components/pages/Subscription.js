import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Loader, CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { subscriptionHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { NoData, EnhancedTable, EmptyTable } from "components/layouts";
import AddIcon from "@mui/icons-material/Add";
import { Modals } from "components/Utilities";
import { SubscriptionModal } from "components/modals/SubscriptionModal";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { useMutation, useLazyQuery } from "@apollo/client";
import { getPlans } from "components/graphQL/useQuery";
import { DELETE_PLAN } from "components/graphQL/Mutation";
import { defaultPageInfo } from "helpers/mockData";
import useAlert from "../../hooks/useAlert";
import { changeTableLimit, handlePageChange } from "helpers/filterHelperFunctions";
import { PlanListRow } from "components/Rows/PlanListRow";

const Subscription = () => {
  const theme = useTheme();
  const { watchFunction } = useAlert();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [deletePlan] = useMutation(DELETE_PLAN);
  const [isDeleting, setIsDeleting] = React.useState({});
  const [id, setId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [singleData, setSingleData] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const [fetchPlans, { loading, data, error, refetch }] = useLazyQuery(getPlans);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleEditCloseDialog = () => {
    setEdit(false);
  };
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
  };
  const handleDialogClose = async () => {
    setIsOpen(false);
    setEditId(null);
  };

  // delete plan
  const onConfirm = async () => {
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

      watchFunction("Plan deleted succesfully", "Couldn't delete plan.", deletePlanRes).then(() => {
        refetch();
        stopDeleting();
      });
    } catch (error) {
      stopDeleting();
      console.error(error);
    }
  };
  const { selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();

  /*   const [searchMail, setSearchMail] = useState(""); */

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    fetchPlans({
      variables: {
        first: pageInfo?.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchPlans, pageInfo]);

  /* const onChange = async (e) => {
    setSearchMail(e);
    if (e == "") {
      refetch();
    } else refetch({ amount: Number(e) });
  }; */
  useEffect(() => {
    if (data) {
      setPlan(data.getPlans.plan);
      setPageInfo(data.getPlans.pageInfo);
      (data.getPlans.plan || []).map((plan) => {
        const newIsDeleting = isDeleting;
        setIsDeleting({ [plan._id]: false, ...newIsDeleting });
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  const initialValues = {
    name: "",
    amount: "",
    description: "",
    duration: "",
    provider: "",
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" flexWrap="nowrap" gap={2} height="100%">
        <Grid item direction={{ sm: "row", xs: "column" }} container gap={{ md: 4, sm: 4, xs: 2 }}>
          {/* <Grid item flex={1}>
            <Search
              value={searchMail}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type to search plans by Amount..."
              height="5rem"
            />
          </Grid> */}

          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Create new plan"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}

        {plan.length > 0 ? (
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={subscriptionHeader}
              rows={plan}
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
              {plan.map((row, index) => {
                const isItemSelected = isSelected(row?._id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <PlanListRow
                    plan={row}
                    key={index}
                    isItemSelected={isItemSelected}
                    handleSelectedRows={handleSelectedRows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    labelId={labelId}
                    handleDeleteOpenDialog={handleDeleteOpenDialog}
                    handleEditOpenDialog={handleEditOpenDialog}
                    deleting={isDeleting[row._id]}
                  />
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={subscriptionHeader} paginationLabel="Subscription  per page" />
        )}
      </Grid>

      {/* create plan modal */}
      <Modals
        isOpen={isOpen}
        title="Create new plan"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <SubscriptionModal
          handleDialogClose={handleDialogClose}
          type="add"
          initialValues={initialValues}
          refresh={refetch}
        />
      </Modals>

      {/* edit plan Modal */}
      <Modals isOpen={edit} title="Edit plan" rowSpacing={5} handleClose={handleEditCloseDialog}>
        <SubscriptionModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          editId={editId}
          singleData={singleData}
          setSingleData={setSingleData}
          refresh={refetch}
        />
      </Modals>

      {/* delete plan modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Plan"
        onConfirm={onConfirm}
        confirmationMsg="delete plan"
        btnValue="Delete"
      />
    </>
  );
};

export default Subscription;
