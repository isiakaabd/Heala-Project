import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import Filter from ".";
import useAlert from "hooks/useAlert";
import { deleteVar, filterData } from "helpers/filterHelperFunctions";
import { useParams } from "react-router-dom";
import { getPlans } from "components/graphQL/useQuery";
import { useLazyQuery } from "@apollo/client";

const SingleHMOFilters = ({ setHmoEnrollees, setPageInfo, queryParams }) => {
  const { hmoId } = useParams();
  const [fetchPlans] = useLazyQuery(getPlans);
  const { displayAlert, getErrorMsg } = useAlert();
  const [planOptions, setPlanOptions] = useState([]);
  const { variables, fetchEnrollees, refetch } = queryParams;
  const [hmoEnrolleeFilterValue, setHmoEnrolleeFilterValue] = useState({
    planId: "",
  });

  useEffect(() => {
    fetchPlans({
      variables: { type: "hmo" },
    })
      .then(({ data }) => {
        const options = (data?.getPlans?.plan || []).map((option) => {
          return { key: option?.name, value: option?._id };
        });
        setPlanOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchPlans]);

  const onFilterChange = async (name, value) => {
    try {
      deleteVar(variables);
      const filterValues = {
        ...hmoEnrolleeFilterValue,
        [name]: value,
        providerId: hmoId,
      };
      console.log(filterValues);
      setHmoEnrolleeFilterValue(filterValues);
      filterData(filterValues, {
        fetchData: fetchEnrollees,
        refetch,
        variables,
      })
        .then((data) => {
          setHmoEnrollees(data?.getEnrollees?.data || []);
          setPageInfo(data?.getEnrollees?.pageInfo || {});
        })
        .catch((error) => {
          console.error(error);
          const errMsg = getErrorMsg(error);
          displayAlert("error", errMsg);
          refresh(setHmoEnrolleeFilterValue, { plan: "" });
        });
    } catch (error) {
      console.error(error);
      const errMsg = getErrorMsg(error);
      displayAlert("error", errMsg);
      refresh(setHmoEnrolleeFilterValue, { plan: "" });
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", "Something went wrong while filtering. Try again.");
    setFilterValue(defaultVal);
    deleteVar(variables);

    refetch({ variables: { providerId: hmoId } })
      .then(({ data }) => {
        setHmoEnrollees(data?.getEnrollees?.data || []);
        setPageInfo(data?.getEnrollees?.pageInfo || {});
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", "Failed to get HMO enrollees data, Try again");
      });
  };

  return (
    <Grid item container flexWrap="wrap" spacing={2} alignItems="flex-end">
      {/* FILTER BY PLAN */}
      <Grid item>
        <Filter
          onHandleChange={(e) => onFilterChange("planId", e?.target?.value)}
          onClickClearBtn={() => onFilterChange("planId", "")}
          options={[{ key: "Access Type", value: "" }, ...planOptions]}
          name="planId"
          value={hmoEnrolleeFilterValue.planId}
          hasClearBtn={true}
          disable={true}
          variant="small"
        />
      </Grid>
      {/* <Grid item>
        <Filter
          onHandleChange={(e) => null}
          onClickClearBtn={() => null}
          options={[{ key: "Gender", value: "" }, ...genderType]}
          name="gender"
          placeholder="Gender"
          value={profileFilterValues.gender}
          hasClearBtn={true}
          disable={true}
          variant="small"
        />
      </Grid> */}
    </Grid>
  );
};

export default SingleHMOFilters;
