import React, { useState } from "react";
import t from "prop-types";
import Filter from "./Filters";
import useAlert from "hooks/useAlert";
import { Search } from "components/Utilities";
import { Grid, Typography } from "@mui/material";
import { deleteVar } from "helpers/filterHelperFunctions";

const CompoundSearch = ({
  queryParams,
  searchState,
  setPageInfo,
  setProfiles,
  getSearchPlaceholder,
  filterOptions,
  showHeala,
}) => {
  const state = searchState || {
    value: "",
    filterBy: "id",
  };
  const { displayAlert } = useAlert();
  const { fetchData, variables, loading, newVariables } = queryParams;
  const [searchValue, setSearchValue] = useState(state);

  const search = async (searchBy, searchVal) => {
    try {
      deleteVar(variables);
      let value = searchVal;
      // if (searchBy === "id") value = `HEALA-${searchVal}`;
      if (searchBy === "ids") value = searchVal;

      const searchVariables =
        value === ""
          ? {
            ...newVariables,
          }
          : {
            [searchBy]: value,
            ...newVariables,
          };
      fetchData({
        variables: searchVariables,
      }).then(({ data }) => {
        if (!data) {
          deleteVar(variables);
          displayAlert("error", `Couldn't search for ${searchVal}`);
          throw Error(`Couldn't search for ${searchVal}`);
        }
        setProfiles(data); // set outside
        setPageInfo(data); // set outside
        deleteVar(variables);
      });
    } catch (error) {
      deleteVar(variables);
      // eslint-disable-next-line no-console
      console.error(error);
      displayAlert("error", `Couldn't search for ${searchVal}`);
    }
  };

  return (
    <Grid container spacing={2} flexWrap="wrap">
      <Grid item>
        <Filter
          options={filterOptions}
          name="search"
          onHandleChange={(e) => {
            deleteVar(variables);
            setSearchValue({ ...searchValue, filterBy: e?.target?.value });
          }}
          value={searchValue.filterBy}
          disable={loading}
        />
      </Grid>
      <Grid item flex={1} width="100%">
        <Search
          height="48px"
          hasStartIcon={false}
          onChange={(e) => {
            let value = e.target.value;
            if (value === "") {
              search(searchValue.filterBy, "");
            } else {
              setSearchValue({ ...searchValue, value });
            }
          }}
          placeholder={getSearchPlaceholder(searchValue.filterBy)}
          startIcon={
            searchValue.filterBy === "id" && !showHeala ? (
              <Typography sx={{ fontSize: "14px" }}>HEALA-</Typography>
            ) : null
          }
          onClickSearchBtn={() =>
            search(searchValue.filterBy, searchValue.value)
          }
        />
      </Grid>
    </Grid>
  );
};

CompoundSearch.propTypes = {
  queryParams: t.object.isRequired,
  searchState: t.object,
  setPageInfo: t.func.isRequired,
  setProfiles: t.func.isRequired,
  getSearchPlaceholder: t.func,
  filterOptions: t.array,
};

export default CompoundSearch;
