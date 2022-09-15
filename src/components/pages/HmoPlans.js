import React, { useState } from "react";
import { Grid } from "@mui/material";
import { NoData } from "components/layouts";
import AddIcon from "@mui/icons-material/Add";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { CustomButton } from "components/Utilities";
import MainModal from "components/modals/MainModal";
import { getPlans } from "components/graphQL/useQuery";
import HMOPlansTable from "components/Tables/HMOPlansTable";
import CreateEditHMOPlans from "components/Forms/CreateEditHMOPlans";

const HmoPlans = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [fetchPlans, { loading, data, error, refetch, variables }] =
    useLazyQuery(getPlans, {
      notifyOnNetworkStatusChange: true,
      variables: { type: "hmo" },
    });

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const initialValues = {
    name: "",
    amount: "0",
    description: "",
    provider: "",
    type: "hmo",
    accessType: "",
    consultation: "unlimited",
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
        <HMOPlansTable
          PlansQuery={{
            fetchPlans,
            loading,
            data,
            refetch,
            variables,
            newVariables: { type: "hmo" },
          }}
        />
      </Grid>

      {/* CREATE PLAN MODAL */}
      <MainModal
        isOpen={isOpen}
        headerText="Create new plan"
        rowSpacing={5}
        setIsOpen={() => setIsOpen(false)}
      >
        <CreateEditHMOPlans
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

export default HmoPlans;
