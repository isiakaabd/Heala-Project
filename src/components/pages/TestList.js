import React from "react";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { NoData, EmptyTable } from "components/layouts";

import { TestListRow } from "components/Rows/TestListRow";
import ConfirmModal from "components/modals/ConfirmModal";
import { AddTestForm } from "components/Forms/AddTestForm";
import { deleteItem } from "helpers/filterHelperFunctions";
import EnhancedTable from "components/layouts/EnhancedTable";
import DeletePartner from "components/modals/DeleteOrDisable";
import { UploadTestForm } from "components/Forms/UploadTestForm";
import { testTableHeadCells } from "components/Utilities/tableHeaders";
import { DELETE_TEST, getListOfLabTests } from "components/graphQL/useQuery";
import { CustomButton, Loader, PreviousButton, Modals } from "components/Utilities";
import { EditTestForm } from "components/Forms/EditTestForm";

const TestList = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = React.useState([]);
  const [delete_test] = useLazyQuery(DELETE_TEST);
  const [editData, setEditData] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState({});
  const [addTestModal, setAddTestModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [testToDelete, setTestToDelete] = React.useState(null);
  const [editTestModal, setEditTestModal] = React.useState(false);
  const [uploadListModal, setUploadListModal] = React.useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);
  const [fetchLabTestList, { loading, error, data, refetch }] = useLazyQuery(getListOfLabTests);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  React.useEffect(() => {
    fetchLabTestList();
  }, [fetchLabTestList]);

  React.useEffect(() => {
    if (data) {
      setList(data?.getDiagnosticLabTests?.data);
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      (data?.getDiagnosticLabTests?.data || []).map((test) => {
        const newIsDeleting = isDeleting;
        setIsDeleting({ [test?._id]: false, ...newIsDeleting });
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
        <Grid item container justifyContent="space-between">
          <PreviousButton path="/settings/list-management" />

          {/* === ADD BUTTONS === */}
          <Grid item>
            <Grid container>
              <CustomButton
                endIcon={<AddIcon />}
                title="Add Test"
                type={buttonType}
                onClick={() => setAddTestModal(true)}
                sx={{ marginRight: "1rem" }}
              />
              <CustomButton
                endIcon={<AddIcon />}
                title="Upload list"
                type={buttonType}
                onClick={() => setConfirmModal(true)}
              />
            </Grid>
          </Grid>
        </Grid>

        {error ? (
          <NoData error={error} />
        ) : loading ? (
          <Loader />
        ) : !list ? (
          <EmptyTable headCells={testTableHeadCells} paginationLabel="Test per page" />
        ) : list.length > 0 ? (
          /* ================= TESTS TABLE ================= */
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={testTableHeadCells}
              rows={list}
              hasCheckbox={false}
              fetchData={fetchLabTestList}
              hasPagination={false}
            >
              {list.map((row, index) => {
                const { _id } = row;
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TestListRow
                    key={_id}
                    data={row}
                    labelId={labelId}
                    setEditData={setEditData}
                    isDeleting={isDeleting[_id]}
                    setTestIdToDelete={setTestToDelete}
                    openEditModal={() => setEditTestModal(true)}
                    openConfirmModal={() => setConfirmDeleteModal(true)}
                  />
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={testTableHeadCells} paginationLabel="Patients per page" />
        )}

        {/* ==== ADD TEST MODAL ==== */}
        <Modals
          isOpen={addTestModal}
          title="Add Test"
          rowSpacing={5}
          height="auto"
          handleClose={() => setAddTestModal(false)}
        >
          <AddTestForm
            onSuccess={() => {
              setAddTestModal(false);
              refetch();
            }}
          />
        </Modals>

        {/* ==== EDIT TEST MODAL ==== */}
        <Modals
          isOpen={editTestModal}
          title="Edit Test"
          rowSpacing={5}
          height="auto"
          handleClose={() => setEditTestModal(false)}
        >
          <EditTestForm
            data={editData}
            onSuccess={() => {
              setEditTestModal(false);
              refetch();
            }}
          />
        </Modals>

        {/* ======== CONFIRM UPLOAD TEST MODAL ========= */}
        <ConfirmModal
          open={confirmModal}
          setOpen={setConfirmModal}
          title="Confirm Upload Tests"
          confirmationMsg="Uploading a new test JSON file will overwrite the current file."
          onConfirm={() => {
            setUploadListModal(false);
            setUploadListModal(true);
          }}
          onCancel={() => {
            setUploadListModal(false);
          }}
        />

        {/* ==== UPLOAD TEST MODAL ==== */}
        <Modals
          isOpen={uploadListModal}
          title="Add Test"
          rowSpacing={5}
          height="auto"
          handleClose={() => setUploadListModal(false)}
        >
          <UploadTestForm
            onSuccess={() => {
              refetch();
              setUploadListModal(false);
            }}
          />
        </Modals>

        {/*  ======= CONFIRM DELETE ======== */}
        <DeletePartner
          open={confirmDeleteModal}
          setOpen={setConfirmDeleteModal}
          title="Delete Test"
          btnValue="delete"
          onConfirm={() => {
            deleteItem(
              delete_test,
              testToDelete,
              setTestToDelete,
              refetch,
              Typography,
              enqueueSnackbar,
              setIsDeleting,
              isDeleting,
            );
            setUploadListModal(false);
          }}
          confirmationMsg="Are you sure you want to delete"
          onCancel={() => {
            setUploadListModal(false);
          }}
        />
      </Grid>
    </>
  );
};

export default TestList;
