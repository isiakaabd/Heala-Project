import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Loader, ProfileCard } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { calculateBMI } from "components/Utilities/bMI";
import {
  getProfile,
  findAllergies,
  getLabResult,
} from "components/graphQL/useQuery";
import { NoData } from "components/layouts";

const MedicalRecords = () => {
  const { patientId } = useParams();
  const [patientProfile, setPatientProfile] = useState(undefined);

  const [patients, { loading, data, error }] = useLazyQuery(getProfile);
  const [alergy, allergyResult] = useLazyQuery(findAllergies, {
    variables: { id: patientId },
  });
  const [labResult, labResults] = useLazyQuery(getLabResult, {
    variables: { id: patientId },
  });
  const [alergies, setAlergies] = useState([]);
  const [lab, setLab] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        patients({ variables: { profileId: patientId } });
        alergy();
        labResult();
        setAlergies(allergyResult.data.findAllergies.allergies);
        setLab(labResults.data.getLabResults.lab);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [
    alergy,
    patients,
    patientId,
    labResult,
    allergyResult.data,
    labResults.data,
  ]);

  useEffect(() => {
    if (data && data.profile) {
      setPatientProfile(data.profile);
    }
  }, [data]);

  if (loading || allergyResult.loading) return <Loader />;
  if (error || allergyResult.error)
    return <NoData error={allergyResult.error || error} />;
  if (patientProfile) {
    const value =
      alergies.length > 0 &&
      alergies?.map((alergy) => alergy.name).filter((i) => i !== undefined);

    const labResult = lab?.map((alergy) => alergy);

    return (
      <Grid
        container
        direction="column"
        gap={{
          md: 5,
          sm: 4,
          xs: 3,
        }}
        paddingBottom={{ md: 10, sm: 5, xs: 3 }}
      >
        <Grid item>
          <Typography variant="h2">Medical Records</Typography>
        </Grid>
        <Grid item container spacing={4} justifyContent="space-between">
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="Height"
              value={
                patientProfile.height ? patientProfile.height : "No Height"
              }
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="Weight"
              value={
                patientProfile.weight ? patientProfile.weight : "No Weight"
              }
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="Blood Group"
              value={
                patientProfile.bloodGroup
                  ? patientProfile.bloodGroup
                  : "No Blood Group"
              }
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="GenoType"
              value={
                patientProfile.genotype
                  ? patientProfile.genotype
                  : "No Genotype"
              }
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="BMI"
              value={
                patientProfile.height
                  ? calculateBMI(
                      patientProfile.height,
                      patientProfile.weight
                    ).toFixed(2)
                  : "No Value"
              }
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="Allergies"
              value={value.length > 0 ? value : "No Allergy"}
            />
          </Grid>
          <Grid item container md={6} sm={6} xs={12}>
            <ProfileCard
              text="Lab Results"
              value={value.length > 0 ? labResult : "No Lab Result"}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  } else return <NoData />;
};

export default MedicalRecords;
