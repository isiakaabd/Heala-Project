import React, { useEffect, useState } from "react";
import ProPtypes from "prop-types";
import { Grid } from "@mui/material";

import Filter from ".";
import useAlert from "hooks/useAlert";
import {
  cadreOptions,
  defaultPageInfo,
  doctorsProfileDefaultFilterByValues,
  genderType,
  specializationOptions,
  statusFilterBy,
} from "helpers/mockData";
import { deleteVar, filterData } from "helpers/filterHelperFunctions";
import { getProviders } from "components/graphQL/useQuery";
import { useLazyQuery } from "@apollo/client";

const DoctorFilters = ({ setProfiles, setPageInfo, queryParams }) => {
  const { displayAlert } = useAlert();
  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [providers, setProviders] = useState([]);
  const [profileFilterValues, setProfileFilterValues] = useState(
    doctorsProfileDefaultFilterByValues
  ); // gender cadre specialization providerId
  const [fetchProviders] = useLazyQuery(getProviders);
  const { doctorsParams, doctorsByStatusParams } = queryParams;
  const { fetchDoctors, loading, refetch, variables } = doctorsParams;
  const {
    byStatusLoading,
    byStatusVaribles,
    byStatusRefetch,
    fetchDoctorsByStatus,
  } = doctorsByStatusParams;

  useEffect(() => {
    fetchProviders()
      .then(({ data }) => {
        if (!data) throw Error("Couldn'ProPtypes get list of providers");
        const providersList = (data?.getProviders?.provider || []).map(
          (provider) => {
            const { _id, name } = provider;
            return { key: name, value: _id };
          }
        );
        setProviders(providersList);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterProfileChange = async (name, value) => {
    try {
      setStatusFilterValue("");
      deleteVar(variables);
      const filterValues = { ...profileFilterValues, [name]: value };
      setProfileFilterValues(filterValues);
      filterData(filterValues, {
        fetchData: fetchDoctors,
        refetch,
        variables,
      })
        .then((data) => {
          setPageInfo(data.doctorProfiles.pageInfo || []);
          setProfiles(data.doctorProfiles.profile || defaultPageInfo);
        })
        .catch(() => {
          refresh(setProfileFilterValues, doctorsProfileDefaultFilterByValues);
        });
    } catch (error) {
      console.error(error);
      refresh(setProfileFilterValues, doctorsProfileDefaultFilterByValues);
    }
  };

  const onFilterStatusChange = async (value) => {
    try {
      setProfileFilterValues(doctorsProfileDefaultFilterByValues);
      deleteVar(byStatusVaribles);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchDoctorsByStatus,
        refetch: byStatusRefetch,
        variables: byStatusVaribles,
      })
        .then((data) => {
          setProfiles(data?.doctorProfilesByStatus?.profile || []);
          setPageInfo(data?.doctorProfilesByStatus?.pageInfo || {});
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
    displayAlert("error", "Something went wrong while filtering. Try again.");
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setProfiles(data?.profiles?.data || []);
        setPageInfo(data?.profiles?.pageInfo || {});
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", "Failed to get patients data, Try again");
      });
  };
  return (
    <Grid item container flexWrap="wrap" spacing={4}>
      {/* FILTER BY PROFILE */}
      <Grid item>
        <Grid container flexWrap="wrap" spacing={2} alignItems="flex-end">
          {[
            {
              label: "",
              onHandleChange: (e) =>
                onFilterProfileChange("gender", e?.target?.value),
              onClickClearBtn: () => onFilterProfileChange("gender", ""),
              options: [{ key: "Gender", value: "" }, ...genderType],
              name: "gender",
              placeholder: "By gender",
              value: profileFilterValues.gender,
              hasClearBtn: true,
              disavle: loading || byStatusLoading,
            },
            {
              label: "",
              onHandleChange: (e) =>
                onFilterProfileChange("cadre", e?.target?.value),
              onClickClearBtn: () => onFilterProfileChange("cadre", ""),
              options: [{ key: "Cadre", value: "" }, ...cadreOptions],
              name: "cadre",
              placeholder: "By cadre",
              value: profileFilterValues.cadre,
              hasClearBtn: true,
              disavle: loading || byStatusLoading,
            },
            {
              label: "",
              onHandleChange: (e) =>
                onFilterProfileChange("specialization", e?.target?.value),
              onClickClearBtn: () =>
                onFilterProfileChange("specialization", ""),
              options: [
                { key: "Specialization", value: "" },
                ...specializationOptions,
              ],
              name: "specialization",
              placeholder: "By specialization",
              value: profileFilterValues.specialization,
              hasClearBtn: true,
              disavle: loading || byStatusLoading,
            },
            {
              label: "",
              onHandleChange: (e) =>
                onFilterProfileChange("providerId", e?.target?.value),
              onClickClearBtn: () => onFilterProfileChange("providerId", ""),
              options: [{ key: "Provider", value: "" }, ...providers],
              name: "providerId",
              placeholder: "By provider",
              value: profileFilterValues.providerId,
              hasClearBtn: true,
              disavle: loading || byStatusLoading,
            },
          ].map((filter, idx) => {
            return (
              <Grid item key={`${idx}-${filter.name}`}>
                <Filter
                  label={filter.label}
                  onHandleChange={(e) => filter.onHandleChange(e)}
                  onClickClearBtn={() => filter.onClickClearBtn()}
                  options={filter.options}
                  name={filter.name}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  hasClearBtn={true}
                  disable={loading || byStatusLoading}
                />
              </Grid>
            );
          })}

          {/* FILTER BY STATUS */}
          <Grid item>
            <Filter
              label=""
              onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
              onClickClearBtn={() => onFilterStatusChange("")}
              options={[{ key: "Status", value: "" }, ...statusFilterBy]}
              name="status"
              placeholder="None"
              value={statusFilterValue}
              hasClearBtn={true}
              disable={loading || byStatusLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
DoctorFilters.propTypes = {
  setProfiles: ProPtypes.func,
  setPageInfo: ProPtypes.func,
  queryParams: ProPtypes.object,
};

export default DoctorFilters;
