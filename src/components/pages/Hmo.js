import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Loader } from "components/Utilities";
import { NoData } from "components/layouts";
import { addHMOInitialValues } from "helpers/mockData";
import { getProviders } from "components/graphQL/useQuery";
import DeletePartner from "components/modals/DeleteOrDisable";
import AddEditHMOModal from "components/modals/AddEditHMOModal";
import InfoCard, { AddHmoCard } from "components/cards/InfoCard";
import useAlert from "hooks/useAlert";
import { deletProvider } from "components/graphQL/Mutation";

const Hmo = () => {
  const { displayAlert, getErrorMsg } = useAlert();
  const [hmos, setHmos] = useState([]);
  const [deleteHMO] = useMutation(deletProvider);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editHMOData, setEditHMOData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [hmoIdToDelete, setHmoIdToDelete] = useState(null);
  const [fetchAllHMO, { error, loading, refetch }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: "61ed2b68e6091400135e3dba" },
    }
  );

  const refetchData = () => {
    refetch()
      .then(({ data }) => {
        setHmos(data?.getProviders?.provider);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllHMO()
      .then(({ data }) => {
        setHmos(data?.getProviders?.provider);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchAllHMO]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid>
      <Grid container spacing={2} flexWrap="wrap">
        {hmos.map((hmo, idx) => {
          const {
            _id,
            name,
            icon,
            address,
            phone,
            email,
            iconAlt,
            userTypeId,
          } = hmo;

          const editInitialValues = {
            id: _id,
            name: name,
            icon: icon,
            address: address || "",
            phone: phone || "",
            email: email || "",
            iconAlt: iconAlt || "",
            userTypeId: userTypeId || "61ed2b68e6091400135e3dba",
          };
          return (
            <Grid key={idx} item>
              <InfoCard
                imgUrl={hmo?.icon}
                imgAlt={hmo?.name}
                linkTo={`hmo/${hmo?._id}`}
                subTitle={"15 Enrollees"}
                title={hmo?.name}
                onClickEdit={() => {
                  setEditHMOData(editInitialValues);
                  setEditModal(true);
                }}
                onClickDelete={() => {
                  setHmoIdToDelete(_id);
                  setDeleteModal(true);
                }}
              />
            </Grid>
          );
        })}
        <Grid item>
          <button
            sx={{
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            onClick={() => setAddModal(true)}
          >
            <AddHmoCard />
          </button>
        </Grid>
      </Grid>
      <Grid>
        {/* CONFIRM DELETE MODAL */}
        <DeletePartner
          open={deleteModal}
          setOpen={setDeleteModal}
          title="Delete HMO"
          btnValue="delete"
          onConfirm={async () => {
            setDeleteModal(false);
            deleteHMO({
              variables: {
                id: hmoIdToDelete,
              },
            })
              .then(({ data }) => {
                if (data) {
                  displayAlert("success", "HMO deleted successfully");
                  refetchData();
                }
              })
              .catch((error) => {
                console.error(error);
                const errMsg = getErrorMsg(error);
                displayAlert("error", errMsg);
              });
          }}
          confirmationMsg="delete HMO"
          onCancel={() => {
            setHmoIdToDelete(null);
          }}
        />

        {/* ADD MODAL */}
        <AddEditHMOModal
          isOpen={addModal}
          setIsOpen={setAddModal}
          type="add"
          initialValues={addHMOInitialValues}
          onSuccess={() => {
            setAddModal(false);
            refetchData();
          }}
        />

        {/* EDIT MODAL */}
        <AddEditHMOModal
          isOpen={editModal}
          setIsOpen={setEditModal}
          type="edit"
          initialValues={editHMOData}
          onSuccess={() => {
            setEditModal(false);
            refetchData();
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hmo;
