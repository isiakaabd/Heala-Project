import React from "react";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";
import { Card } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Settings = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      alignItems="space-between"
      gap="5rem"
      paddingY="2rem"
      justifyContent={{ sm: "center", md: "center" }}
    >
      <Grid item container md={5} sm={5} xs={12}>
        <Grid item container flexDirection="column">
          <Link to="/settings/administrator" style={{ textDecoration: "none" }}>
            <Card
              alt="A administrator icon used as a representation for the administrator "
              title="Administrator"
              background={theme.palette.common.lightGreen}
            >
              <Administrator fill={theme.palette.common.green} />
            </Card>
          </Link>
        </Grid>
      </Grid>
      {/* 2 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid item container flexDirection="column">
          <Link to="/settings/management" style={{ textDecoration: "none" }}>
            <Card
              alt="An icon used as a representation for making consultation with the doctor"
              title="Role Management"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
      {/* 3 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid item container flexDirection="column">
          <Link to="/settings/permissions" style={{ textDecoration: "none" }}>
            <Card
              alt="An icon used as a permission for making consultation with the doctor"
              title="Permissions"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
      <Grid item container md={5} sm={5} xs={12}>
        <Grid item container flexDirection="column">
          <Link to="/settings/list-management" style={{ textDecoration: "none" }}>
            <Card
              alt="list management Icon"
              title="List management"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Settings;
