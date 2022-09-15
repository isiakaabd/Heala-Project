import React, { useState } from "react";
import { Grid } from "@mui/material";
import { NoData } from "components/layouts";
import AddIcon from "@mui/icons-material/Add";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { CustomButton } from "components/Utilities";
import MainModal from "components/modals/MainModal";
import { getPlans } from "components/graphQL/useQuery";
import HealaPlansTable from "components/Tables/HealaPlansTable";
import CreateEditHealaPlans from "components/Forms/CreateEditHealaPlans";

const HealaPlans = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [fetchPlans, { loading, data, error, refetch, variables }] =
    useLazyQuery(getPlans, {
      variables: { provider: "61db6f8968b248001aec4fcb" },
    });

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const initialValues = {
    name: "",
    amount: "",
    description: "",
    duration: "one-off",
    provider: "61db6f8968b248001aec4fcb",
    type: "heala",
    consultation: "1",
  };

  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid
        container
        direction="column"
        flexWrap="nowrap"
        gap={2}
        height="100%"
      >
        <Grid
          item
          direction={{ sm: "row", xs: "column" }}
          container
          justifyContent="flex-end"
          gap={{ md: 4, sm: 4, xs: 2 }}
        >
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Create new plan"
              type={buttonType}
              onClick={() => setIsOpen(true)}
            />
          </Grid>
        </Grid>
        <HealaPlansTable
          PlansQuery={{
            fetchPlans,
            loading,
            data,
            refetch,
            variables,
            newVariables: { provider: "61db6f8968b248001aec4fcb" },
          }}
        />
      </Grid>

      {/* CREATE PLAN MODAL */}
      <MainModal
        isOpen={isOpen}
        headerText="Create new plan"
        rowSpacing={5}
        setIsOpen={setIsOpen}
      >
        <CreateEditHealaPlans
          initialValues={initialValues}
          type="add"
          onSuccess={() => {
            setIsOpen(false);
            refetch();
          }}
        />
      </MainModal>
    </>
  );
};

export default HealaPlans;
