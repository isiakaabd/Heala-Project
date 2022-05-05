<>
  <Grid container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="body1">Doctor Name</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {doctorData ? `${doctorData.firstName} ${doctorData.lastName}` : "No Doctor"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="body1">Hospital</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {doctorData ? `${doctorData.hospital}` : "No Hospital "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="body1">Gender:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {doctorData ? `${doctorData.gender} ` : "Not Specified"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  <Grid container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="body1">Medical ID:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {doctorData ? `${doctorData.dociId.split("-")[1]}` : "No ID "}{" "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="body1">Specialization:</Typography>
        </Grid>
        <Grid item width="100%">
          <Typography variant="h4">
            {doctorData ? `${doctorData.specialization}` : "No specialization "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={4} md={4}>
      <Grid container direction="column" gap={1} width="100%">
        <Grid item>
          <Typography variant="body1">DOB:</Typography>
        </Grid>
        <Grid item width="100%">
          <Typography variant="h4">
            {doctorData ? `${dateMoment(doctorData.dob)}` : "No DOB"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</>;
