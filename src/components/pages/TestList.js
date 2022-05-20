import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { NoData, EmptyTable } from "components/layouts";
import { isSelected } from "helpers/isSelected";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { TestListRow } from "components/Rows/TestListRow";
import EnhancedTable from "components/layouts/EnhancedTable";
import { getListOfLabTests } from "components/graphQL/useQuery";
import { testTableHeadCells } from "components/Utilities/tableHeaders";
import { CustomButton, Loader, PreviousButton, Modals } from "components/Utilities";
import { AddTestForm } from "components/Forms/AddTestForm";

const TestList = () => {
  const theme = useTheme();
  const [list, setList] = useState([]);
  const [fetchLabTestList, { loading, error, data, refetch }] = useLazyQuery(getListOfLabTests);

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [addTestModal, setAddTestModal] = useState(false);
  const [setUploadListModal] = useState(false);

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
                onClick={() => setUploadListModal(true)}
              />
            </Grid>
          </Grid>
        </Grid>

        {error ? (
          <NoData error={error} />
        ) : loading ? (
          <Loader />
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
                const { _id, name, price, tat } = row;
                const isItemSelected = isSelected(_id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TestListRow
                    isItemSelected={isItemSelected}
                    key={_id}
                    handleSelectedRows={handleSelectedRows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    labelId={labelId}
                    testName={name}
                    price={price}
                    tat={tat}
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
      </Grid>
    </>
  );
};

TestList.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default TestList;
