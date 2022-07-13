import React, { useState } from "react";
import t from "prop-types";
import Filter from "./Filters";
import useAlert from "../../hooks/useAlert";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { deleteVar } from "helpers/filterHelperFunctions";
import { CustomButton, Search } from "components/Utilities";

const CompoundSearch = ({
  queryParams,
  setPageInfo,
  setProfiles,
  getSearchPlaceholder,
  filterOptions,
}) => {
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const { fetchData, variables, loading } = queryParams;
  const [searchValue, setSearchValue] = useState({
    value: "",
    filterBy: "id",
  });

  const search = async (searchBy, searchVal) => {
    try {
      deleteVar(variables);
      let value = searchVal;
      if (searchVal === "") return;
      if (searchBy === "id") value = `HEALA-${searchVal}`;
      fetchData({
        variables: {
          [searchBy]: value,
        },
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
      console.error(error);
      displayAlert("error", `Couldn't search for ${searchVal}`);
    }
  };

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
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
          onChange={(e) => {
            let value = e.target.value;
            setSearchValue({ ...searchValue, value });
          }}
          placeholder={getSearchPlaceholder(searchValue.filterBy)}
          height="5rem"
          startIcon={
            searchValue.filterBy === "id" ? (
              <Typography>HEALA-</Typography>
            ) : null
          }
        />
      </Grid>
      <Grid item>
        <CustomButton
          title="Search"
          type={buttonType}
          onClick={() => search(searchValue.filterBy, searchValue.value)}
        />
      </Grid>
    </Grid>
  );
};

CompoundSearch.propTypes = {
  queryParams: t.object.isRequired,
  setPageInfo: t.func.isRequired,
  setProfiles: t.func.isRequired,
  getSearchPlaceholder: t.func,
  filterOptions: t.array,
};

export default CompoundSearch;
