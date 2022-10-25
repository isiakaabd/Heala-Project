import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { useTheme } from "@mui/styles";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { defaultPageInfo } from "helpers/mockData";
import MainModal from "components/modals/MainModal";
import { CustomButton } from "components/Utilities";
import ConfirmModal from "components/modals/ConfirmModal";
import { getEnrolles } from "components/graphQL/useQuery";
import { useLazyQuery, useMutation } from "@apollo/client";
import { uploadFile } from "helpers/filterHelperFunctions";
import SingleHMOTable from "components/Tables/SingleHMOTable";
import { uploadHMOEnrollees } from "components/graphQL/Mutation";
import AddEditHMOEnrolleeModal from "components/modals/AddEditHMOEnrolleeModal";
import { UploadEnrolleeListForm } from "components/Forms/UploadEnrolleeListForm";

const SingleHMO = () => {
  const theme = useTheme();
  const { ids: id } = useParams();
  const { displayAlert, getErrorMsg } = useAlert();
  const [hmoEnrollees, setHmoEnrollees] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [uploadEnrollees] = useMutation(uploadHMOEnrollees);
  const [uploadListModal, setUploadListModal] = useState(false);
  const [addEnrolleeModal, setAddEnrolleeModal] = useState(false);
  const [confirmUploadModal, setConfirmUploadModal] = useState(false);
  const [
    fetchEnrollees,
    { error, loading, refetch, variables, networkStatus },
  ] = useLazyQuery(getEnrolles);

  const enrolleesParams = {
    hmoEnrollees,
    setHmoEnrollees,
    pageInfo,
    setPageInfo,
    fetchEnrollees,
    error,
    loading,
    refetch,
    variables,
    networkStatus,
  };

  const fetchData = (fetch) => {
    fetch({
      variables: {
        providerId: id,
        first: 10,
      },
    })
      .then(({ data }) => {
        setHmoEnrollees(data?.getEnrollees?.data || []);
        setPageInfo(data?.getEnrollees?.pageInfo || {});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData(fetchEnrollees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEnrollees, id]);

  const darkButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const lightButton = {
    background: "#fff",

    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  return (
    <Grid>
      <Grid
        container
        spacing={3}
        justifyContent="end"
        marginBottom="2rem"
        marginTop="2rem"
      >
        <Grid item>
          <CustomButton
            startIcon={<AddIcon />}
            title="Upload List"
            type={lightButton}
            textColor="#2D2F39"
            textColorOnHover="#ffffff"
            onClick={() => setConfirmUploadModal(true)}
          />
        </Grid>
        <Grid item>
          <CustomButton
            startIcon={<AddIcon />}
            title="Add  Enrollee"
            type={darkButton}
            onClick={() => setAddEnrolleeModal(true)}
          />
        </Grid>
      </Grid>
      <Grid>
        <SingleHMOTable enrolleesParams={enrolleesParams} />
      </Grid>

      {/* MODALS */}
      <Grid>
        {/* ADD ENROLLEE MODAL */}
        <AddEditHMOEnrolleeModal
          isOpen={addEnrolleeModal}
          setIsOpen={setAddEnrolleeModal}
          refetchData={() =>
            refetch({
              variables: {
                providerId: id,
                first: 10,
              },
            })
              .then(({ data }) => {
                setHmoEnrollees(data?.getEnrollees?.data || []);
                setPageInfo(data?.getEnrollees?.pageInfo || {});
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error);
              })
          }
        />

        {/* ======== CONFIRM UPLOAD ENROLLEE MODAL ========= */}
        <ConfirmModal
          open={confirmUploadModal}
          setOpen={setConfirmUploadModal}
          title="Confirm Upload Enrollee list"
          confirmationMsg="Uploading a new Enrollee JSON file will overwrite the current file."
          onConfirm={() => {
            setConfirmUploadModal(false);
            setUploadListModal(true);
          }}
          onCancel={() => {
            setConfirmUploadModal(false);
          }}
        />

        {/* UPLOAD LIST MODAL */}
        <MainModal isOpen={uploadListModal} setIsOpen={setUploadListModal}>
          <UploadEnrolleeListForm
            onSubmit={async (values) => {
              const throwError = () =>
                displayAlert(
                  "error",
                  "Something went wrong while uploading file."
                );
              try {
                const { file } = values;
                const fileUrl = await uploadFile(file);

                if (typeof fileUrl !== "string") {
                  throwError();
                  return;
                }

                const { data } = await uploadEnrollees({
                  variables: {
                    planId: values?.planId,
                    fileUrl: fileUrl,
                    providerId: id,
                  },
                });

                if (!data) {
                  throwError();
                  return;
                }

                const enrolleesAdded =
                  data?.uploadEnrollees?.result?.totalInserted;

                displayAlert(
                  "success",
                  `${enrolleesAdded && enrolleesAdded} Tests Added.`
                );
                fetchData(refetch);
                setUploadListModal(false);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error from onSubmit Test JSON file", error);
                const errMsg = getErrorMsg(error);
                displayAlert("error", errMsg);
              }
            }}
          />
        </MainModal>
      </Grid>
    </Grid>
  );
};

export default SingleHMO;
