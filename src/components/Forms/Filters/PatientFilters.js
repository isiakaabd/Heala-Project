import React, { useEffect, useState } from "react";
import t from "prop-types";
import { Grid } from "@mui/material";

import Filter from ".";
import useAlert from "hooks/useAlert";
import { useLazyQuery } from "@apollo/client";
import { getPlans, getProviders } from "components/graphQL/useQuery";
import { deleteVar, filterData } from "helpers/filterHelperFunctions";
import {
  genderType,
  patientsProfileDefaultFilterByValues,
  /* statusFilterBy, */
} from "helpers/mockData";

const PatientFilters = ({ setProfiles, setPageInfo, queryParams }) => {
  const { displayAlert } = useAlert();
  const [plans, setPlans] = useState([]);
  const [fetchPlans] = useLazyQuery(getPlans);
  const [providers, setProviders] = useState([]);
  const [fetchProviders] = useLazyQuery(getProviders);
  const [providerId, setProviderId] = useState(null);
  const [filterPlanValue, setFilterPlanValue] = useState("");
  const [, setStatusFilterValue] = useState("");
  const { patientsParams, patientsByStatusParams, patientsByPlanParams } =
    queryParams;
  const { fetchPatient, loading, refetch, variables } = patientsParams;
  const [profileFilterValues, setProfileFilterValues] = useState(
    patientsProfileDefaultFilterByValues
  );
  const {
    byStatusLoading,
    /* byStatusVaribles,
    byStatusRefetch,
    fetchPatientByStatus, */
  } = patientsByStatusParams;
  const { byPlanLoading, byPlanVaribles, byPlanRefetch, fetchPatientByPlan } =
    patientsByPlanParams;

  useEffect(() => {
    fetchProviders()
      .then(({ data }) => {
        if (!data) throw Error("Couldn't get list of providers");
        const providersList = (data?.getProviders?.provider).map((provider) => {
          const { _id, name } = provider;
          return { key: name, value: _id };
        });
        setProviders(providersList);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (providerId === "" || providerId === null) return;
    fetchPlans({ variables: { provider: providerId } })
      .then(({ data }) => {
        if (!data) throw Error("Couldn't get list of plans");
        const planList = (data?.getPlans?.plan || []).map((plan) => {
          const { _id, name } = plan;
          return { key: name, value: _id };
        });
        setPlans(planList);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  const onFilterProfileChange = async (name, value) => {
    try {
      if (name === "provider") setProviderId(value);
      setStatusFilterValue("");
      deleteVar(variables);
      const filterValues = { ...profileFilterValues, [name]: value };
      setProfileFilterValues(filterValues);
      filterData(filterValues, {
        fetchData: fetchPatient,
        refetch,
        variables,
      })
        .then((data) => {
          setProfiles(data?.profiles?.data || []);
          setPageInfo(data?.profiles?.pageInfo || {});
        })
        .catch(() => {
          refresh(setProfileFilterValues, patientsProfileDefaultFilterByValues);
        });
    } catch (error) {
      console.error(error);
      refresh(setProfileFilterValues, patientsProfileDefaultFilterByValues);
    }
  };

  /*   const onFilterStatusChange = async (value) => {
    try {
      setProfileFilterValues({ gender: "", provider: "" });
      deleteVar(byStatusVaribles);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchPatientByStatus,
        refetch: byStatusRefetch,
        variables: byStatusVaribles,
      })
        .then((data) => {
          setProfiles(data?.profilesByStatus?.data || []);
          setPageInfo(data?.profilesByStatus?.pageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  }; */

  const onFilterPlanChange = async (value) => {
    try {
      if (value === "") {
        setProfileFilterValues({
          ...patientsProfileDefaultFilterByValues,
        });
      } else {
        setProfileFilterValues({
          ...patientsProfileDefaultFilterByValues,
          provider: profileFilterValues.provider,
        });
      }
      deleteVar(byPlanVaribles);
      setFilterPlanValue(value);
      const filterVariables = { planId: value };

      filterData(filterVariables, {
        fetchData: fetchPatientByPlan,
        refetch: byPlanRefetch,
        variables: byPlanVaribles,
      })
        .then((data) => {
          setProfiles(data?.profilesByPlan?.data || []);
          setPageInfo(data?.profilesByPlan?.pageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", `Something went wrong while filtering. Try again.`);
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setProfiles(data?.profiles?.data || []);
        setPageInfo(data?.profiles?.pageInfo || {});
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", `Failed to get patients data, Try again`);
      });
  };
  return (
    <Grid item container flexWrap="wrap" spacing={2} alignItems="flex-end">
      {/* FILTER BY GENDER */}
      <Grid item>
        <Filter
          onHandleChange={(e) =>
            onFilterProfileChange("gender", e?.target?.value)
          }
          onClickClearBtn={() => onFilterProfileChange("gender", "")}
          options={[{ key: "Gender", value: "" }, ...genderType]}
          name="gender"
          value={profileFilterValues.gender}
          hasClearBtn={true}
          disable={loading || byStatusLoading || byPlanLoading}
          variant="small"
        />
      </Grid>

      {/* FILTER BY PROVIDER AND PLAN */}
      <Grid item>
        <Filter
          onHandleChange={(e) =>
            onFilterProfileChange("provider", e?.target?.value)
          }
          onClickClearBtn={() => onFilterProfileChange("provider", "")}
          options={[{ key: "Provider", value: "" }, ...providers]}
          name="provider"
          value={profileFilterValues.provider}
          hasClearBtn={true}
          disable={loading || byStatusLoading || byPlanLoading}
        />
      </Grid>
      {profileFilterValues.provider === "" ? null : (
        <Grid item>
          <Filter
            label=""
            onHandleChange={(e) => onFilterPlanChange(e?.target?.value)}
            onClickClearBtn={() => onFilterPlanChange("")}
            options={plans}
            name="plan"
            placeholder="Provider Plan"
            value={filterPlanValue}
            hasClearBtn={true}
            disable={loading || byStatusLoading || byPlanLoading}
          />
        </Grid>
      )}

      {/* FILTER BY STATUS */}
      {/* <Grid item>
        <Filter
          label="By Status"
          onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
          onClickClearBtn={() => onFilterStatusChange("")}
          options={statusFilterBy}
          name="status"
          placeholder="None"
          value={statusFilterValue}
          hasClearBtn={true}
          disable={loading || byStatusLoading || byPlanLoading}
        />
      </Grid> */}
      {/* ==== CLEAR FILTERS BUTTON ===== */}
      {/* <Grid item>
            <ClearFiltersBtn
              title="Clear filters"
              onHandleClick={() => {
                resetFilters(
                  setFilterValues,
                  patientsPageDefaultFilterValues,
                  variables,
                  fetchPatient
                );
              }}
            />
          </Grid> */}
    </Grid>
  );
};
PatientFilters.propTypes = {
  setProfiles: t.func.isRequired,
  setPageInfo: t.func.isRequired,
  queryParams: t.object.isRequired,
};

export default PatientFilters;
