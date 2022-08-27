import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { NoData, EmptyTable } from "components/layouts";

import useAlert from "hooks/useAlert";
import TableLayout from "components/layouts/TableLayout";
import { TestListRow } from "components/Rows/TestListRow";
import ConfirmModal from "components/modals/ConfirmModal";
import { AddTestForm } from "components/Forms/AddTestForm";
import EnhancedTable from "components/layouts/EnhancedTable";
import { EditTestForm } from "components/Forms/EditTestForm";
import ConfirmDelete from "components/modals/DeleteOrDisable";
import UploadListModal from "components/modals/UploadListModal";
import { CustomButton, Loader, Modals } from "components/Utilities";
import { deleteItem, uploadFile } from "helpers/filterHelperFunctions";
import { testTableHeadCells } from "components/Utilities/tableHeaders";
import { DELETE_TEST, getListOfLabTests } from "components/graphQL/useQuery";
import { uploadTests } from "components/graphQL/Mutation";

const TestList = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);
  const [delete_test] = useLazyQuery(DELETE_TEST);
  const { displayAlert, getErrorMsg } = useAlert();
  const [uploadTestFile] = useMutation(uploadTests);
  const [editData, setEditData] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState({});
  const [addTestModal, setAddTestModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [testToDelete, setTestToDelete] = React.useState(null);
  const [editTestModal, setEditTestModal] = React.useState(false);
  const [uploadListModal, setUploadListModal] = React.useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);
  const [fetchLabTestList, { loading, error, data, refetch }] =
    useLazyQuery(getListOfLabTests);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  useEffect(() => {
    fetchLabTestList();
  }, [fetchLabTestList]);

  useEffect(() => {
    if (data) {
      setList(data?.getDiagnosticLabTests?.data);
    }
  }, [data]);

  useEffect(() => {
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
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid item container justifyContent="flex-end">
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

        <TableLayout>
          {error ? (
            <NoData error={error} />
          ) : loading ? (
            <Loader />
          ) : !list ? (
            <EmptyTable
              headCells={testTableHeadCells}
              paginationLabel="Test per page"
            />
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
            <EmptyTable
              headCells={testTableHeadCells}
              paginationLabel="Patients per page"
            />
          )}
        </TableLayout>

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

        {/*  ======= CONFIRM DELETE ======== */}
        <ConfirmDelete
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
              isDeleting
            );
            setUploadListModal(false);
          }}
          confirmationMsg="Are you sure you want to delete"
          onCancel={() => {
            setUploadListModal(false);
          }}
        />

        {/* ==== UPLOAD TEST MODAL ==== */}
        <UploadListModal
          isOpen={uploadListModal}
          setIsOpen={setUploadListModal}
          handleSubmit={async (values) => {
            const throwError = () =>
              displayAlert(
                "error",
                "Something went wrong while uploading file."
              );
            try {
              const { testFile: file } = values;
              const fileUrl = await uploadFile(file);

              if (typeof fileUrl !== "string") {
                throwError();
                return;
              }

              const { data } = await uploadTestFile({
                variables: {
                  fileUrl: fileUrl,
                },
              });

              if (!data) {
                throwError();
                return;
              }

              const testAdded =
                data?.uploadDiagnosticLabTests?.result?.totalInserted;
              displayAlert("success", `${testAdded && testAdded} Tests Added.`);
              setUploadListModal(false);
            } catch (error) {
              console.error("Error from onSubmit Test JSON file", error);
              const errMsg = getErrorMsg(error);
              displayAlert("error", errMsg);
            }
          }}
        />
      </Grid>
    </>
  );
};

export default TestList;
