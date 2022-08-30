{
  /* doctor */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Doctor Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1">{data && totalDoc}</Typography>
            <Grid item>
              {doctorPercentage < 1 ? (
                <ArrowDownwardOutlined sx={{ color: "#f2190a" }} />
              ) : (
                <ArrowUpwardIcon color="success" />
              )}
            </Grid>
            <Typography
              style={{
                color:
                  doctorPercentage < 1 ? "#f2190a" : theme.palette.success.main,
              }}
              variant="body2"
            >
              {doctorPercentage
                ? `${Math.abs(doctorPercentage.toFixed(0))} %`
                : 0}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Doctors
        </Typography>
      </Grid>
    </Grid>

    <Grid item>
      <FormSelect
        value={graphState?.state}
        onChange={graphFunc}
        options={newOptions}
        name="graph"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart graphState={graphState} optionsValue={newOptions} />

    {/* Line */}
    <Grid
      item
      container
      justifyContent="space-between"
      paddingTop={{ sm: 3, xs: 2 }}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              {doctorStats?.totalActive}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "1rem" }}>
                <div
                  className={`${classes.dottedCircle} ${classes.green}`}
                ></div>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.common.lightGrey }}
                >
                  Total active Doctors
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              {doctorStats?.totalInactive}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "1rem" }}>
                <div className={`${classes.dottedCircle} ${classes.red}`}></div>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.common.lightGrey }}
                >
                  Total inactive Doctors
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;
{
  /* patients */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Patients Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1">{data && totalPatient}</Typography>
            <Grid item>
              {patientPercentage < 1 ? (
                <ArrowDownwardOutlined sx={{ color: "#f2190a" }} />
              ) : (
                <ArrowUpwardIcon color="success" />
              )}
            </Grid>
            <Typography
              style={{
                color:
                  patientPercentage < 1
                    ? "#f2190a"
                    : theme.palette.success.main,
              }}
              variant="body2"
            >
              {patientPercentage
                ? `${Math.abs(patientPercentage.toFixed(0))} %`
                : 0}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Patients
        </Typography>
      </Grid>
    </Grid>

    <Grid item display={{ sm: "block", xs: "none" }}>
      <FormSelect
        value={patientGraphState?.state}
        onChange={patientGraphFunc}
        options={newOptions}
        name="graph"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart graphState={patientGraphState} optionsValue={newOptions} />

    {/* Line */}
    <Grid
      item
      container
      justifyContent="space-between"
      paddingTop={{ sm: 3, xs: 2 }}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              {data && patients.totalActive}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "1rem" }}>
                <div
                  className={`${classes.dottedCircle} ${classes.green}`}
                ></div>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.common.lightGrey }}
                >
                  Total active Patients
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              {patients?.totalInactive}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "1rem" }}>
                <div className={`${classes.dottedCircle} ${classes.red}`}></div>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.common.lightGrey }}
                >
                  Total inactive Patients
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;
{
  /* partners */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Partners Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1">{data && partnersData.total}</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Partners
        </Typography>
      </Grid>
    </Grid>

    <Grid item>
      <FormSelect
        value={partnerGraphState?.state}
        onChange={partnerFunc}
        options={partnerOptions}
        name="partner-select"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart
      graphState={partnerGraphState}
      optionsValue={partnerOptions}
      type="partners"
    />
  </Grid>
  <Grid
    item
    container
    justifyContent="space-between"
    paddingTop={{ sm: 3, xs: 2 }}
  >
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.partnerStats?.totalHospitals}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.green}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Hospitals
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.partnerStats?.totalPharmacies}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.red}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Pharmacies
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.partnerStats?.totalDiagnostics}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Diagnostics
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;

{
  /* consultations */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Consultations Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1">{data && total}</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Consultations
        </Typography>
      </Grid>
    </Grid>

    <Grid item>
      <FormSelect
        value={consultationState?.state}
        onChange={consultationFunc}
        options={consultationsOptions}
        name="consulation-select"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart
      graphState={consultationState}
      optionsValue={consultationsOptions}
      type="consultation"
    />
  </Grid>
  <Grid
    item
    container
    justifyContent="space-between"
    paddingTop={{ sm: 3, xs: 2 }}
  >
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.consultationStats?.totalAccepted}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.green}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Accepted
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.consultationStats?.totalCompleted}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.green}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Completed
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.consultationStats?.totalCancelled}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Cancelled
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.consultationStats?.totalDeclined}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Declined
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data?.consultationStats?.totalOngoing}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.red}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Ongoing
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;
{
  /* subscribers */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Subscribers Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1"> {totalSubs}</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Subscribers
        </Typography>
      </Grid>
    </Grid>

    <Grid item>
      <FormSelect
        value={subScriptionState?.state}
        onChange={subGraphFunc}
        options={newOptions}
        name="partner-select"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart graphState={subScriptionState} optionsValue={newOptions} />

    {/* Line */}
  </Grid>
  <Grid
    item
    container
    flexWrap="nowrap"
    justifyContent="space-between"
    paddingTop={{ sm: 3, xs: 2 }}
  >
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data && activeSubsNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.green}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Total active Subscribers
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {data && inActiveSubsNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.red}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Total inactive Subscribers
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;
{
  /* finance */
}
<Grid item container className={classes.chartCard}>
  <Grid item className={classes.headerGrid}>
    <Typography variant="h5">Financial Stats</Typography>
  </Grid>
  <Divider color={theme.palette.common.lighterGrey} />

  <Grid
    item
    container
    flexWrap="nowrap"
    paddingY={{ md: 2, sm: 2, xs: 2 }}
    justifyContent="space-between"
  >
    <Grid
      item
      gap={{ sm: 3, xs: 2, md: 3 }}
      alignItems="center"
      flexWrap={"nowrap"}
      container
      flex={3}
    >
      <Grid item className={classes.groupIconGrid}>
        <GroupIcon color="success" className={classes.groupIcon} />
      </Grid>
      <Grid item alignItems="center" container flex={1}>
        <Grid item container direction="column">
          <Grid item container gap={1}>
            <Typography variant="h1">
              {" "}
              {formatNumber(totalEarning + totalPayouts)}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: theme.palette.common.lightGrey,
            whiteSpace: "nowrap",
          }}
        >
          Total Finances
        </Typography>
      </Grid>
    </Grid>

    <Grid item>
      <FormSelect
        value={financialState?.state}
        onChange={financeFunc}
        options={financeOptions}
        name="partner-select"
      />
    </Grid>
  </Grid>

  <Divider color={theme.palette.common.lighterGrey} />
  <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
    <LineChart
      graphState={financialState}
      optionsValue={financeOptions}
      type="finance"
    />

    {/* Line */}
  </Grid>
  <Grid
    item
    container
    flexWrap="nowrap"
    justifyContent="space-between"
    paddingTop={{ sm: 3, xs: 2 }}
  >
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {formatNumber(totalEarning)}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.green}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Total Earnings
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {formatNumber(totalPayouts)}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "1rem" }}>
              <div className={`${classes.dottedCircle} ${classes.red}`}></div>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey }}
              >
                Total Payouts
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>;
