import React from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { illnessSchema } from "helpers/validationSchemas";
import useAlert from "hooks/useAlert";
import { Grid } from "@mui/material";
import { getIllnesses } from "components/graphQL/useQuery";
import { CustomButton, Modals } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import FormikControl from "components/validation/FormikControl";
import { createIllness, updateIllness } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
const IllnessModal = ({
  open,
  type,
  handleClose,

  initialValues,
}) => {
  const { displayAlert } = useAlert();
  const theme = useTheme();
  const [create] = useMutation(createIllness);
  const [update] = useMutation(updateIllness);
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const onSubmit = async (values) => {
    const { name, description, id } = values;

    try {
      if (type === "add") {
        await create({
          variables: {
            name,
            description,
          },
          refetchQueries: [{ query: getIllnesses }],
        });
        displayAlert("success", "Illness successfully created");
      }

      if (type === "edit") {
        await update({
          variables: {
            id,
            name,
            description,
          },
          refetchQueries: [{ query: getIllnesses }],
        });
        displayAlert("success", "Illness successfully updated");
      }
    } catch (err) {
      displayAlert("error", err);
    }
    handleClose();
  };

  return (
    <Modals
      isOpen={open}
      title={type === "add" ? "Add Illness" : "Update Illness"}
      rowSpacing={5}
      width={{ sm: "35vw", xs: "90vw", md: "35vw" }}
      handleClose={handleClose}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validationSchema={illnessSchema}
        validateOnChange={false}
        validateOnMount={false}
        enableReinitialize
      >
        {({ isSubmitting, isValid, dirty, errors }) => {
          console.log(errors);
          return (
            <Form style={{ marginTop: "3rem" }}>
              <Grid item container direction="column" gap={3}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="name"
                    label="Name"
                    placeholder="Select name"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="textarea"
                    name="description"
                    label="Description"
                    placeholder="Description..."
                  />
                </Grid>
                <Grid item container>
                  <CustomButton
                    title={type === "add" ? "Add Illness" : "Update Illness"}
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Modals>
  );
};

IllnessModal.propTypes = {
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
};
export default IllnessModal;
