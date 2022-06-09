import React from "react";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";
import { Card } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const WhiteLabel = () => {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        alignItems="space-between"
        gap="5rem"
        paddingY="2rem"
        justifyContent={{ sm: "center", md: "center" }}
      >
        <Grid item container md={5} sm={5} xs={12}>
          <Grid item container flexDirection="column">
            <Link to="/label/provider" style={{ textDecoration: "none" }}>
              <Card
                alt="providers "
                title="Providers"
                background={theme.palette.common.lightGreen}
              >
                <Administrator fill={theme.palette.common.green} />
              </Card>
            </Link>
          </Grid>
        </Grid>
        <Grid item container md={5} sm={5} xs={12}>
          <Grid item container flexDirection="column">
            <Link to="/label/types" style={{ textDecoration: "none" }}>
              <Card
                alt="User Types"
                title="User Types"
                background={theme.palette.common.lightRed}
              >
                <ConsulationIcon fill={theme.palette.common.red} />
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default WhiteLabel;
