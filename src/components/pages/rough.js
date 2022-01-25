<Grid item container width="75%" margin="auto">
  <Formik
    initialValues={role}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    validateOnChange={false}
    validateOnMount
    enableReinitialize
  >
    {({ isSubmitting, dirty, isValid, values }) => {
      return (
        <Form style={{ marginTop: "3rem" }}>
          <Grid item container direction="column">
            <Grid item container>
              <Grid item container gap={2}>
                <Grid container direction="column" gap={2}>
                  <FormikControl
                    control="input"
                    name="name"
                    label=" Name of role"
                    placeholder="Enter Plan Name"
                  />
                </Grid>
                <Grid container direction="column">
                  <FormikControl
                    control="input"
                    name="description"
                    label=" Description"
                    placeholder="Enter Description"
                  />
                </Grid>
              </Grid>

              <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                <Grid item>
                  <Typography variant="h6">Account</Typography>
                </Grid>
                <Grid item direction="column" gap={1}>
                  <FormikControl control="checkbox" name="permissions" options={optionss} />
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                <Grid item>
                  <Typography variant="h6">Illness</Typography>
                </Grid>
                <Grid item direction="column" gap={1}>
                  <FormikControl control="checkbox" name="permissions" options={optionss2} />
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                <Grid item>
                  <Typography variant="h6">Family</Typography>
                </Grid>
                <Grid item direction="column" gap={1}>
                  <FormikControl control="checkbox" name="permissions" options={optionss3} />
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                <Grid item>
                  <Typography variant="h6">Allergy</Typography>
                </Grid>
                <Grid item direction="column" gap={1}>
                  <FormikControl control="checkbox" name="permissions" options={optionss4} />
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                <Grid item>
                  <Typography variant="h6" textAlign="center">
                    Consultation
                  </Typography>
                </Grid>
                <Grid item direction="column" gap={1}>
                  <FormikControl control="checkbox" name="permissions" options={optionss5} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} marginTop={10}>
              <CustomButton
                title="Edit Role"
                width="100%"
                isSubmitting={isSubmitting}
                type={buttonType}
                disabled={!(dirty || isValid)}
              />
            </Grid>
          </Grid>
        </Form>
      );
    }}
  </Formik>
</Grid>;
