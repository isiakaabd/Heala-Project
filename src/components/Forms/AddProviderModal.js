import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { useHistory } from "react-router-dom";
import FormikControl from "components/validation/FormikControl";
import { getProviders } from "components/graphQL/useQuery";
import { createProvider } from "components/graphQL/Mutation";
import { addProviderValidation } from "helpers/validationSchemas";
import { Modals, CustomButton } from "components/Utilities";

const AddProviderModal = ({
  openAddHcp,
  handleClose,
  buttonType,
  id,
  pushTo,
}) => {
  const [add] = useMutation(createProvider);
  const { displayAlert } = useAlert();
  const history = useHistory();
  const onSubmit = async (values) => {
    const { name } = values;
    try {
      await add({
        variables: {
          name,
          userTypeId: id,
        },
        refetchQueries: [
          {
            query: getProviders,
            variables: {
              userTypeId: id,
            },
          },
        ],
      });
      displayAlert("success", "Provider added");
      history.push(pushTo);
    } catch (err) {
      displayAlert("error", err);
    }
    handleClose();
  };
  return (
    <Modals
      isOpen={openAddHcp}
      title="Add Provider"
      rowSpacing={5}
      height="auto"
      width={{ sm: "20vw", xs: "90vw" }}
      handleClose={handleClose}
    >
      <Formik
        initialValues={{ name: "" }}
        onSubmit={onSubmit}
        validationSchema={addProviderValidation}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, dirty, isValid }) => {
          return (
            <Form style={{ marginTop: "1rem" }}>
              <Grid container direction="column" gap={2}>
                <Grid item container direction="column" gap={1}>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      label="Name"
                      id="name"
                      name="name"
                      placeholder="Enter Provider's Name"
                    />
                  </Grid>
                </Grid>

                <Grid item container>
                  <CustomButton
                    title="Add Provider"
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

export default AddProviderModal;
