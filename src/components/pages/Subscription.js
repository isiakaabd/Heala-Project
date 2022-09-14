import React, { useState } from "react";
import { Grid } from "@mui/material";
import { NoData } from "components/layouts";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { CustomButton } from "components/Utilities";
import MainModal from "components/modals/MainModal";
import PlansTable from "components/Tables/PlansTable";
import { getPlans } from "components/graphQL/useQuery";
import CreateEditPlans from "components/Forms/CreateEditPlans";

const Subscription = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [fetchPlans, { loading, data, error, refetch, variables }] =
    useLazyQuery(getPlans, {
      variables: { provider: id },
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
    provider: id,
    type: "hospital",
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
        <PlansTable
          PlansQuery={{
            fetchPlans,
            loading,
            data,
            refetch,
            variables,
            newVariables: { provider: id },
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
        <CreateEditPlans
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

export default Subscription;
